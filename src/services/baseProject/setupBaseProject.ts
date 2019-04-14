import { addScripts } from "../../utils/package";
import * as execa from "execa";
import * as path from "path";
import {
  baseProjectUrl,
  unnecessaryFiles
} from "../../config/baseProjectConfig";
import { spin } from "../../utils/spin";

const cloneBaseProject = async (projectName: string) => {
  await execa("git", ["clone", baseProjectUrl, projectName]);
};

const getOriginalPackageJson = async (projectName: string) => {
  return import(path.join(process.cwd(), projectName, "package.json"));
};

const removeUnnecessaryFiles = async (projectName: string) => {
  await execa("rm", ["-rf", ...unnecessaryFiles], { cwd: projectName });
};

const initializePackageJson = async (
  projectName: string,
  packageManager: "npm" | "yarn"
) => {
  await execa(`cd ${projectName} && ${packageManager} init -y`, {
    shell: true
  });
};

const duplicateDotEnv = async (projectName: string) => {
  await execa("cp", [".env.example", ".env"], { cwd: projectName });
};

const installDependencies = async (
  projectName: string,
  packageManager: "npm" | "yarn",
  basePackageInfo: any
) => {
  const add = packageManager === "yarn" ? "add" : "install";
  const saveDev = packageManager === "yarn" ? "--dev" : "--save-dev";

  const dependencies = Object.keys(basePackageInfo.dependencies).join(" ");
  const devDependencies = Object.keys(basePackageInfo.devDependencies).join(
    " "
  );

  await execa(`cd ${projectName} && ${packageManager} ${add} ${dependencies}`, {
    shell: true
  });

  await execa(
    `cd ${projectName} && ${packageManager} ${add} ${saveDev} ${devDependencies}`,
    { shell: true }
  );
};

export const setupBaseProject = async (
  projectName: string,
  packageManager: "yarn" | "npm" = "npm"
) => {
  let basePackages: any;

  await spin({ text: "Pulling base project" }, async () => {
    await cloneBaseProject(projectName);
    basePackages = await getOriginalPackageJson(projectName);
    await removeUnnecessaryFiles(projectName);
    await initializePackageJson(projectName, packageManager);
    await duplicateDotEnv(projectName);
  });

  addScripts(basePackages.scripts);

  await spin({ text: "Installing dependencies" }, async () => {
    await installDependencies(projectName, packageManager, basePackages);
  });
};
