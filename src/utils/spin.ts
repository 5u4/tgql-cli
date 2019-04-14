import * as ora from "ora";

export const spin = async (options: ora.Options, cb: () => Promise<void>) => {
  const spinner = ora(options).start();
  await cb();
  spinner.succeed();
};
