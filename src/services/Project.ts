import { projectName } from "../index";
import * as execa from "execa";
import * as fs from "fs";

export class Project {
  private static readonly baseProjectUrl =
    "https://github.com/senhungwong/type-graphql-template.git";
  private static readonly unnecessaryFiles = [
    "package.json",
    "yarn.lock",
    ".git"
  ];

  public static canCreate() {
    let canCreate = true;
    const dirNotEmptyCode = "ENOTEMPTY";

    try {
      fs.rmdirSync(projectName);
    } catch (e) {
      if (e.code === dirNotEmptyCode) {
        canCreate = false;
      }
    }

    return canCreate;
  }

  public static async cloneBaseProject() {
    await execa("git", ["clone", this.baseProjectUrl, projectName]);
  }

  public static async removeUnnecessaryFiles() {
    await execa("rm", ["-rf", ...this.unnecessaryFiles], { cwd: projectName });
  }

  public static async duplicateDotEnv() {
    await execa("cp", [".env.example", ".env"], { cwd: projectName });
  }
}
