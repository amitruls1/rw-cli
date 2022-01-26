import Listr from "listr";
import { install } from "pkg-install";
import { DEP_GRAPH, DEP_ENVIRONMENT } from "./dependancyGraph";
import WEBPACK from "./webpack_tasks";
import { verifyWebPackRelatedStuffs } from "./utility";

const SUPPORTED_COMMANDS = ["webpack", "react", "scss", "css"];

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
  const { new_commands, webpackFilePath } = verifyWebPackRelatedStuffs(
    commands
  );
  let WEBPACK_CONFIGURATION = [];
  new_commands.forEach((item) => {
    switch (item) {
      case "webpack":
        WEBPACK_CONFIGURATION.push({
          title: `Configuring ${item}`,
          task: () => WEBPACK.executeWebPackConfiguration(webpackFilePath),
        });
        break;
      case "react":
        WEBPACK_CONFIGURATION.push({
          title: `Configuring ${item}`,
          task: () => WEBPACK.executeReactConfiguration(webpackFilePath),
        });
        break;
      case "scss":
        WEBPACK_CONFIGURATION.push({
          title: `Configuring ${item}`,
          task: () => WEBPACK.executeSCSSConfiguration(webpackFilePath),
        });
        break;
      case "css":
        WEBPACK_CONFIGURATION.push({
          title: `Configuring ${item}`,
          task: () => WEBPACK.executeCSSConfiguration(webpackFilePath),
        });
        break;
      default:
    }
  });
  return WEBPACK_CONFIGURATION;
};

export const runCommandTask = async (commands) => {
  const TOTAL_INSTALLATION = getPackageInstallationTasks(commands);
  const WEBPACK_CONFIGURATION = runWebPackFileChanges(commands);
  const installation_tasks = new Listr(TOTAL_INSTALLATION);
  const webpack_tasks = new Listr(WEBPACK_CONFIGURATION);
  console.log("Installing Dependancies...");
  await installation_tasks.run();
  console.log("Configuring Dependancies...");
  await webpack_tasks.run();
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
