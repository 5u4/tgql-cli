import { isFolderEmpty } from "./utils/checkFolderEmpty";
import * as program from "commander";
import { setupBaseProject } from "./services/baseProject/setupBaseProject";
import { writeScripts } from "./utils/package";
import { setupGit } from "./services/git/setupGit";
import chalk from "chalk";
import { promptQuestions } from "./services/prompt/promptQuestions";

program.version(require("../package").version).usage("<project-name>");
program.parse(process.argv);

if (program.args.length !== 1) {
  program.help();
  process.exit(1);
}

const projectName = program.args[0];

if (!isFolderEmpty(projectName)) {
  console.log(
    chalk.bold.red(`Folder "${projectName}" already exists and is not empty.`)
  );
  process.exit(1);
}

const main = async () => {
  const { packageManager } = await promptQuestions();

  await setupBaseProject(projectName, packageManager);
  await writeScripts(projectName);
  await setupGit(projectName);
};

main();
