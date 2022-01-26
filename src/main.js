import { verifyCommands, runCommandTask } from "./command_tasks";

export const executeCommand = async (commands) => {
  verifyCommands(commands);
  await runCommandTask(commands);
};

export const executeComponent = (components) => {
  console.log(components);
};
