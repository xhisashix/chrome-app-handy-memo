const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/popup.js",
  output: {
    filename: "js/popup.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // CSS ローダーの設定
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/html/", to: "html" },
        { from: "./src/css/", to: "css" },
        { from: "./src/manifest.json", to: "manifest.json" },
        { from: "./src/img/", to: "img" },
      ],
    }),
  ],
};
