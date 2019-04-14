import * as inquirer from "inquirer";
import { Answer } from "./Answer";

export const questions: inquirer.Questions<Answer> = [
  // Package manager
  {
    type: "list",
    name: "packageManager",
    message: "Please select the package manager you want to use",
    choices: ["npm", "yarn"]
  }
];
