const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sassLintPlugin = require('sasslint-webpack-plugin');

var path = require('path');

console.log("Building " + process.env.npm_package_name + " v" + process.env.npm_package_version);

module.exports = {
  entry: "./src/entry.js",
  output: {
    path: path.resolve(__dirname, './build/dist'),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { 
              loader: 'css-loader',
               options: { 
                 importLoaders: 1 
                } 
              },
              { 
                loader: 'sass-loader',
                 options: { 
                   importLoaders: 1 
                  } 
                },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("app.css"),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new sassLintPlugin({
      configFile: '.sass-lint.yml',
      glob: 'src/**/*.s?(a|c)ss',
      quiet: false,
      ignorePlugins: [
         'extract-text-webpack-plugin',
          'html-webpack-plugin' 
      ],
      failOnWarning: false,
      failOnError: true,
      testing: false
    }),
  ]
};