import * as fs from "fs";

export const isFolderEmpty = (projectName: string) => {
  let canCreate = true;
  const dirNotEmptyCode = "ENOTEMPTY";

  try {
    fs.rmdirSync(projectName);
  } catch (e) {
    if (e.code === dirNotEmptyCode) {
      canCreate = false;
    }
  }

  return canCreate;
};
