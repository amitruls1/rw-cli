import Listr from "listr";
import { projectInstall } from "pkg-install";
import { install } from "pkg-install";

const SUPPORTED_COMMANDS = ["webpack", "react", "scss", "css", "html", "file"];

const verifyCommands = commands => {
  const not_supported = [];
  commands.forEach(item => {
    if (!SUPPORTED_COMMANDS.includes(item)) {
      not_supported.push(item);
    }
  });
  if (not_supported.length) {
    throw `${not_supported} is not supported currently by rw-cli. Please check supported commands here`;
  }
};

const installingDependancies = async commands => {
  const { stdout } = await install(
    {
      twilio: "^3.1",
      "node-env-run": "~1",
      "pkg-install": undefined
    },
    {
      dev: true,
      prefer: "npm"
    }
  );
  console.log(stdout);
};

const runTask = async commands => {
  const tasks = new Listr([
    // {
    //   title: "Copy project files",
    //   task: () => copyTemplateFiles(commands)
    // },
    // {
    //   title: "Initialize git",
    //   task: () => initGit(commands)
    // },
    {
      title: "Install dependencies",
      task: () => installingDependancies(commands)
    }
  ]);
  await tasks.run();
};

export const executeCommand = async commands => {
  verifyCommands(commands);
  await runTask(commands);
};

export const executeComponent = components => {
  console.log(components);
};
