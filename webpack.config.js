const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/popup.js",
  output: {
    filename: "js/popup.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/html/", to: "html" },
        { from: "./src/css/", to: "css" },
        { from: "./src/manifest.json", to: "manifest.json" },
      ],
    }),
  ],
};
