import { Option } from "./Option";
import { projectName } from "../index";
import * as execa from "execa";
import * as path from "path";
import * as fs from "fs";

export class Package {
  private static readonly unnecessaryFields = [
    "main",
    "keywords",
    "description"
  ];

  private static package: any;
  private static packagePath = path.join(
    process.cwd(),
    projectName,
    "package.json"
  );

  public static async get() {
    return import(this.packagePath);
  }

  public static async load() {
    this.package = JSON.parse(
      fs.readFileSync(this.packagePath, { encoding: "utf-8" })
    );
  }

  public static async initialize() {
    await execa(
      `cd ${projectName} && ${Option.answer.packageManager} init -y`,
      {
        shell: true
      }
    );
  }

  public static async removeUnnecessaryFields() {
    this.unnecessaryFields.forEach(field => delete this.package[field]);
  }

  public static addScript(key: string, value: string) {
    this.package.scripts[key] = value;
  }

  public static async write() {
    fs.writeFileSync(this.packagePath, JSON.stringify(this.package, null, 2));
  }

  public static async install() {
    const add = Option.answer.packageManager === "yarn" ? "add" : "install";
    const saveDev =
      Option.answer.packageManager === "yarn" ? "--dev" : "--save-dev";

    const { dependencies, devDependencies } = this.package;

    const dependencyString = Object.keys(dependencies).join(" ");
    const devDependencyString = Object.keys(devDependencies).join(" ");

    await execa(
      `cd ${projectName} && ${
        Option.answer.packageManager
      } ${add} ${dependencyString}`,
      { shell: true }
    );

    await execa(
      `cd ${projectName} && ${
        Option.answer.packageManager
      } ${add} ${saveDev} ${devDependencyString}`,
      { shell: true }
    );
  }
}
