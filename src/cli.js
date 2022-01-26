import arg from "arg";
import fs from "fs";
import { promisify } from "util";

const access = promisify(fs.access);

import { executeCommand, executeComponent } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--install": Boolean,
      "--component": Boolean,
      "-C": "--component",
      "-I": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    install: args["--install"] || false,
    component: args["--component"] || false,
    package: args._,
  };
}

const validateOptions = (options) => {
  if (options.install && options.component) {
    throw "Can pass one command at a time";
  }
  if (!options.install && !options.component) {
    throw "For install package use -I or --install, For add component use -C or --component";
  }
};

export function cli(args) {
  try {
    const options = parseArgumentsIntoOptions(args);
    validateOptions(options);
    if (options.component) {
      executeComponent(options.package);
    } else {
      executeCommand(options.package);
    }
  } catch (e) {
    console.error(e);
  }
}
