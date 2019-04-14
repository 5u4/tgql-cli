import * as program from "commander";
import { setupBaseProject } from "./services/setupBaseProject";

program.version(require("../package").version).usage("<project-name>");
program.parse(process.argv);

if (program.args.length !== 1) {
  program.help();
  process.exit(1);
}

const main = async () => {
  await setupBaseProject(program.args[0]);
};

main();
