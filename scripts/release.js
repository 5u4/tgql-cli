const semver = require("semver");
const execa = require("execa");
const commander = require("commander");
const fs = require("fs");
const path = require("path");

commander.parse(process.argv).usage("<next-version>");

if (commander.args.length !== 1) {
  commander.help();
  process.exit(1);
}

const package = require("../package");

const nextVersion = commander.args[0];
const currentVersion = package.version;

if (!semver.valid(nextVersion) || semver.lte(nextVersion, currentVersion)) {
  commander.help();
  process.exit(1);
}

const publish = async () => {
  // Build
  const build = await execa("npx", ["tsc"], { stdout: "inherit" });
  if (build.failed) {
    process.exit(1);
  }

  // Update package.json
  package.version = nextVersion;
  fs.writeFileSync(
    path.join(__dirname, "../package.json"),
    JSON.stringify(package, null, 2)
  );

  // Commit and tag
  await execa("git", ["add", "."], { stdout: "inherit" });
  await execa("git", ["commit", "-m", `Release verison ${nextVersion}`], {
    stdout: "inherit"
  });
  await execa(
    "git",
    ["tag", "-a", `v${nextVersion}`, "-m", `v${nextVersion}`],
    {
      stdout: "inherit"
    }
  );

  // Push git
  await execa("git", ["push"], { stdout: "inherit" });
  await execa("git", ["push", "--tags"], { stdout: "inherit" });

  // Publish
  await execa("npm", ["publish"], { stdout: "inherit" });
};

publish();
