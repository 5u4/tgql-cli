import { projectName } from "../index";
import * as execa from "execa";

export class Git {
  public static async initialize() {
    await execa("git", ["init"], { cwd: projectName });
  }

  public static async addAllAndCommit(message = "Initialize") {
    await execa("git", ["add", "."], { cwd: projectName });
    await execa("git", ["commit", "-m", message], { cwd: projectName });
  }
}
