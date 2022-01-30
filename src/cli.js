import arg from "arg";
import fs from "fs";

import { executeCommand, executeComponent, executePageSpeed } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--install": Boolean,
      "--component": Boolean,
      "--vitals": Boolean,
      "--device": String,
      "--url": String,

      "-I": "--install",
      "-C": "--component",
      "-V": "--vitals",
      "-D": "--device",
      "-U": "--url",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    install: args["--install"] || false,
    component: args["--component"] || false,
    vitals: args["--vitals"] || false,
    device: args["--device"] || "desktop",
    url: args["--url"] || "https://google.com",
    package: args._,
  };
}

const validateOptions = (options) => {
  if (options.install && options.component && options.vitals) {
    throw "Can pass one command at a time";
  }
  if (!options.install && !options.component && !options.vitals) {
    throw "For install package use -I or --install, For add component use -C or --component, For page speed use -V along with -D for device and -U for url";
  }
};

export function cli(args) {
  try {
    const options = parseArgumentsIntoOptions(args);
    validateOptions(options);
    if (options.component) {
      executeComponent(options.package);
    } else if (options.install) {
      executeCommand(options.package);
    } else if (options.vitals) {
      executePageSpeed(options.url, options.device);
    } else {
      console.log("Please type correct cli options");
    }
  } catch (e) {
    console.error(e);
  }
}
