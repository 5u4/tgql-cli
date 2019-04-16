import * as inquirer from "inquirer";

interface Answer {
  packageManager: "npm" | "yarn";
}

const questions: inquirer.Questions<Answer> = [
  {
    type: "list",
    name: "packageManager",
    message: "Package manager",
    choices: ["npm", "yarn"]
  }
];

export class Option {
  public static projectName: string;
  public static answer: Answer;

  public static async prompt() {
    this.answer = await inquirer.prompt(questions);
  }
}
