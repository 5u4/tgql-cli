import * as execa from "execa";

export const initGit = async (projectName: string) => {
  await execa("git", ["init"], { cwd: projectName });
};

export const commitGit = async (projectName: string) => {
  await execa("git", ["add", "."], { cwd: projectName });
  await execa("git", ["commit", "-m", `"Initialize"`], { cwd: projectName });
};
