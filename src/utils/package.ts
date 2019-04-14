import * as path from "path";
import * as fs from "fs";

const scripts: { [key: string]: string } = {};

export const addScripts = (s: { [key: string]: string }) => {
  Object.keys(s).forEach(script => {
    scripts[script] = s[script];
  });
};

export const writeScripts = async (projectName: string) => {
  const packagePath = path.join(process.cwd(), projectName, "package.json");
  const info = await import(packagePath);
  info.scripts = scripts;
  fs.writeFileSync(packagePath, JSON.stringify(info, null, 2));
};
