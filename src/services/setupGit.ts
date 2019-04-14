import * as execa from "execa";

export const setupGit = async (projectName: string) => {
  await execa("git", ["init"], { cwd: projectName });
  await execa("git", ["add", "."], { cwd: projectName });
  await execa("git", ["commit", "-m", `"Initialize"`], { cwd: projectName });
};
