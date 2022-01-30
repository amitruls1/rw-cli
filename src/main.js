import { verifyCommands, runCommandTask } from "./command_tasks";
import runPsi from "./psi";

export const executeCommand = async (commands) => {
  verifyCommands(commands);
  await runCommandTask(commands);
};

export const executeComponent = (components) => {
  console.log(components);
};

export const executePageSpeed = (url, device) => runPsi(url, device);
