import { isFolderEmpty } from "./services/checkFolderEmpty";
import * as program from "commander";
import { setupBaseProject } from "./services/setupBaseProject";
import { writeScripts } from "./services/package";
import { setupGit } from "./services/setupGit";
import chalk from "chalk";

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
  await setupBaseProject(projectName);
  await writeScripts(projectName);
  await setupGit(projectName);
};

main();
