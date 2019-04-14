import * as program from "commander";
import { setupBaseProject } from "./services/setupBaseProject";
import { writeScripts } from "./services/package";
import { setupGit } from "./services/setupGit";

program.version(require("../package").version).usage("<project-name>");
program.parse(process.argv);

if (program.args.length !== 1) {
  program.help();
  process.exit(1);
}

const main = async () => {
  const projectName = program.args[0];
  await setupBaseProject(projectName);
  await writeScripts(projectName);
  await setupGit(projectName);
};

main();
