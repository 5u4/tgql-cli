import { Package } from "./../services/Package";
import { Project } from "../services/Project";
import { Git } from "../services/Git";

export const setupBaseProject = async () => {
  await Project.cloneBaseProject();
  const templatePackage = await Package.get();
  await Project.removeUnnecessaryFiles();
  await Git.initialize();
  await Package.initialize();
  await Project.duplicateDotEnv();

  Object.keys(templatePackage.scripts).forEach(key =>
    Package.addScript(key, templatePackage.scripts[key])
  );
};
