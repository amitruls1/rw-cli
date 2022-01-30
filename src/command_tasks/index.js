import Listr from "listr";
import { install } from "pkg-install";
const term = require("terminal-kit").terminal;
import { DEP_GRAPH, DEP_ENVIRONMENT } from "./dependancyGraph";
import WEBPACK from "./webpack_tasks";

const SUPPORTED_COMMANDS = ["webpack", "react", "scss", "css", "babel"];

const installingDependancies = async (item) =>
  await install(
    { [item]: undefined },
    {
      dev: DEP_ENVIRONMENT[item] || true,
      prefer: "npm",
    }
  );

const getPackageInstallationTasks = (commands) => {
  let TOTAL_DEPENDANCIES = [],
    TOTAL_INSTALLATION = [];
  commands.forEach((item) => {
    DEP_GRAPH[item].forEach((dep_package) => {
      TOTAL_DEPENDANCIES.push(dep_package);
    });
  });
  TOTAL_DEPENDANCIES = TOTAL_DEPENDANCIES.filter(function (value, index) {
    return TOTAL_DEPENDANCIES.indexOf(value) === index;
  });
  TOTAL_DEPENDANCIES.forEach((item) => {
    TOTAL_INSTALLATION.push({
      title: `Installing ${item}`,
      task: () => installingDependancies(item),
    });
  });
  return TOTAL_INSTALLATION;
};

const runWebPackFileChanges = (commands) => {
  let WEBPACK_CONFIGURATION = [];
  commands.forEach((item) => {
    switch (item) {
      case "webpack":
        term.bold.underline.white(
          `For ${item} Please create a file name with webpack.config.js or webpack.js and update with this snippet \n`
        );
        WEBPACK.executeWebPackConfiguration();
        break;
      case "react":
        term.bold.underline.blue(
          `For ${item} Please update your webpack file with this snippet \n`
        );
        WEBPACK.executeReactConfiguration();
        break;
      case "scss":
        term.bold.underline.magenta(
          `For ${item} Please update your webpack file with this snippet \n`
        );
        WEBPACK.executeSCSSConfiguration();
        break;
      case "css":
        term.bold.underline.yellow(
          `For ${item} Please update your webpack file with this snippet \n`
        );
        WEBPACK.executeCSSConfiguration();
        break;
      case "babel":
        term.bold.underline.green(
          `For ${item} Please update your webpack file with this snippet \n`
        );
        WEBPACK.executeBabelConfiguration();
        break;
      default:
    }
  });
  return WEBPACK_CONFIGURATION;
};

export const runCommandTask = async (commands) => {
  const TOTAL_INSTALLATION = getPackageInstallationTasks(commands);
  const installation_tasks = new Listr(TOTAL_INSTALLATION);
  term.bold.yellow("Installing Dependancies... \n");
  await installation_tasks.run();
  term.bold.yellow("Printing Required Webpack Changes... \n");
  runWebPackFileChanges(commands);
};

export const verifyCommands = (commands) => {
  const not_supported = [];
  commands.forEach((item) => {
    if (!SUPPORTED_COMMANDS.includes(item)) {
      not_supported.push(item);
    }
  });
  if (not_supported.length) {
    throw `${not_supported} is not supported currently by rw-cli. Please check supported commands here`;
  }
};
