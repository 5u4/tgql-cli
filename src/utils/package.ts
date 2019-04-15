import * as path from "path";
import * as fs from "fs";

const scripts: { [key: string]: string } = {};

export const addScripts = (s: { [key: string]: string }) => {
  Object.keys(s).forEach(script => {
    scripts[script] = s[script];
  });
};

const writeScripts = async (projectName: string) => {
  const packagePath = path.join(process.cwd(), projectName, "package.json");
  const info = JSON.parse(fs.readFileSync(packagePath, { encoding: "utf-8" }));
  info.scripts = scripts;
  fs.writeFileSync(packagePath, JSON.stringify(info, null, 2));
};

const removeUnnecessaryFields = async (projectName: string) => {
  const packagePath = path.join(process.cwd(), projectName, "package.json");
  const info = JSON.parse(fs.readFileSync(packagePath, { encoding: "utf-8" }));
  ["main", "keywords", "description"].forEach(field => {
    delete info[field];
  });
  fs.writeFileSync(packagePath, JSON.stringify(info, null, 2));
};

export const writePackage = async (projectName: string) => {
  await writeScripts(projectName);
  await removeUnnecessaryFields(projectName);
};
