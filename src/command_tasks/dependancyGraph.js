export const DEP_GRAPH = {
  webpack: ["webpack", "webpack-cli", "webpack-dev-server"],
  react: ["react", "react-dom", "@babel/preset-react"],
  css: ["css-loader", "style-loader"],
  scss: ["css-loader", "style-loader", "sass-loader", "node-sass"],
  babel: ["@babel/core", "@babel/preset-env", "babel-loader"],
};

export const DEP_ENVIRONMENT = {
  react: false,
  "react-dom": false,
};
