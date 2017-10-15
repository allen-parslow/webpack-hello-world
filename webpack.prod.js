const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({ // <-- key to reducing React's size
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),        
        new webpack.optimize.UglifyJsPlugin(), //minify everything
        new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
      ]
});