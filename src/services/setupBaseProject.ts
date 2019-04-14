import * as execa from "execa";
import {
  baseProjectUrl,
  unnecessaryFiles,
  baseDependencies,
  baseDevDependencies
} from "../config/baseProjectConfig";
import { spin } from "../utils/spin";

const cloneBaseProject = async (projectName: string) => {
  await execa("git", ["clone", baseProjectUrl, projectName]);
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

const installDependencies = async (
  projectName: string,
  packageManager: "npm" | "yarn"
) => {
  const add = packageManager === "yarn" ? "add" : "install";
  const saveDev = packageManager === "yarn" ? "--dev" : "--save-dev";

  await execa(
    `cd ${projectName} && ${packageManager} ${add} ${baseDependencies.join(
      " "
    )}`,
    { shell: true }
  );

  await execa(
    `cd ${projectName} && ${packageManager} ${add} ${saveDev} ${baseDevDependencies.join(
      " "
    )}`,
    { shell: true }
  );
};

export const setupBaseProject = async (
  projectName: string,
  packageManager: "yarn" | "npm" = "npm"
) => {
  await spin({ text: "Pulling base project" }, async () => {
    await cloneBaseProject(projectName);
    await removeUnnecessaryFiles(projectName);
    await initializePackageJson(projectName, packageManager);
  });

  await spin({ text: "Installing dependencies" }, async () => {
    await installDependencies(projectName, packageManager);
  });
};
