const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname,
        filename: "app.js"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("app.css"),
    ]
  };