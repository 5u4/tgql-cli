import { prompt } from "inquirer";
import { questions } from "./questions";

export const promptQuestions = async () => {
  return prompt(questions);
};
