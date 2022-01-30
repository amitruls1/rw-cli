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
    term.white(`Add these commands in scripts of Package.json`);
    console.log("\n");
    term.white(`"dev": "webpack serve --open --mode development",`);
    console.log("\n");
    term.white(`"build": "webpack --mode production",`);
    console.log("\n");
    term.white(
      `and then from terminal type => "npm run dev" to run development or "npm run build" to build production build`
    );
  }
  async executeReactConfiguration() {
    term.blue(`
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
      "You must install @babel/core, @babel/preset-env, babel-loader via typing rw-cli -I babel"
    );
    console.log("\n");
    term.blue.underline(
      "please also update this in babel.config.js (if not exist then create one in root folder)"
    );
    term.blue(`
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
    term.magenta(`
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
              test: /\.s?css$/i,
              exclude: /node_modules/,
              use: ['style-loader', 'css-loader', 'sass-loader'],
            },
          ]
        }
      }`);
    console.log("\n");
  }
  async executeCSSConfiguration() {
    term.yellow(`
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
              test: /\.css$/,
              exclude: /node_modules/,
              use: ['style-loader', 'css-loader'],
            },
          ]
        }
      }`);
    console.log("\n");
  }
  async executeBabelConfiguration() {
    term.green(`
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
    term.green.underline(
      "please also update this in babel.config.js (if not exist then create one in root folder)"
    );
    term.green(`
      {
        "presets": [
          "@babel/preset-env"
        ]
      }
    `);
    console.log("\n");
  }
}

const WEBPACK = new WebPackConfig();
export default WEBPACK;
