class WebPackConfig {
  async executeWebPackConfiguration(webpackFilePath) {
    console.log("configuration webpack");
  }
  async executeReactConfiguration(webpackFilePath) {
    console.log("configuration react");
  }
  async executeSCSSConfiguration(webpackFilePath) {
    console.log("configuration scss");
  }
  async executeCSSConfiguration(webpackFilePath) {
    console.log("configuration css");
  }
}

const WEBPACK = new WebPackConfig();
export default WEBPACK;
