import * as program from "commander";
import chalk from "chalk";

program.version(require("../package").version).usage("<project-name>");
program.parse(process.argv);

if (program.args.length !== 1) {
  program.help();
  process.exit(1);
}

export const projectName = program.args[0];

import { Package } from "./services/Package";
import { Option } from "./services/Option";
import { Project } from "./services/Project";
import { setupBaseProject } from "./bootstrap/setup";
import { Git } from "./services/Git";

if (!Project.canCreate()) {
  console.log(
    chalk.bold.red(`Folder "${projectName}" already exists and is not empty.`)
  );
  process.exit(1);
}

// const main = async () => {
//   await Option.prompt();

//   await Project.setup();

//   // await setupBaseProject(projectName, packageManager);
//   // await writePackage(projectName);
//   // await commitGit(projectName);
// };

// main();

(async () => {
  await Option.prompt();
  await setupBaseProject();
  await Package.write();
  await Git.addAllAndCommit();
})();
