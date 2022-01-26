import fs from "fs";

let webpackFilePath = "./webpack.config.js";

const verifyIfWebpackExists = () => {
  const path = "./webpack.js";
  const configPath = "./webpack.config.js";
  console.log(
    "Checking if webpack file exist in ./webpack.js or ./webpack.config.js"
  );
  if (fs.existsSync(path) || fs.existsSync(configPath)) {
    console.log("Webpack exists on any one path", path, configPath);
    webpackFilePath = path || configPath;
    return true;
  } else {
    console.log(
      "Webpack file does not exist at any given path",
      path,
      configPath
    );
    return false;
  }
};

export const verifyWebPackRelatedStuffs = (commands) => {
  const isWebpackExist = verifyIfWebpackExists();
  const isNewCommandNeeded = commands.indexOf("webpack");
  if (!isWebpackExist && isNewCommandNeeded) {
    throw "Webpack does not exist, configurations can only be done in webpack file. You can also install webpack.";
  }
  if (commands[0] !== "webpack" && isNewCommandNeeded) {
    let temp = commands[0];
    commands[0] = "webpack";
    commands[isNewCommandNeeded] = temp;
  }
  return {
    new_commands: commands,
    webpackFilePath,
  };
};
