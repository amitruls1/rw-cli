const term = require("terminal-kit").terminal;

class WebPackConfig {
  async executeWebPackConfiguration() {
    term.white(`
      const webpack = require('webpack');
      const path = require("path");
      module.exports = {
        entry: "your_index_file_path",
        output: {
          path: path.resolve(__dirname, "dist"),
          filename: "bundle.js"
        },
      }`);
    console.log("\n");
  }
  async executeReactConfiguration() {
    term.white(`
      const webpack = require('webpack');
      const path = require("path");
      module.exports = {
        entry: "your_index_file_path",
        output: {
          path: path.resolve(__dirname, "dist"),
          filename: "bundle.js"
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader'],
            },
          ]
        }
      }`);
    console.log("\n");
    term.blue.underline(
      "please also update this in babel.config.js (if not exist then create one in root folder)"
    );
    term.white(`
      {
        "presets": [
          "@babel/preset-env",
          "@babel/preset-react"
        ]
      }
    `);
    console.log("\n");
  }
  async executeSCSSConfiguration() {
    console.log("configuring scss");
    console.log("\n");
  }
  async executeCSSConfiguration() {
    console.log("configuring css");
    console.log("\n");
  }
  async executeBabelConfiguration() {
    console.log("configuring babel");
    console.log("\n");
  }
}

const WEBPACK = new WebPackConfig();
export default WEBPACK;
