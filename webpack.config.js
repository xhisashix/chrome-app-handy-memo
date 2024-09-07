const webpack = require("webpack");

module.exports = {
  // ... 他のwebpack設定 ...
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
