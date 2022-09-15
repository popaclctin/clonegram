const path = require('path');
const port = process.env.PORT || 3000;
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port,
    historyApiFallback: true,
  },
});
