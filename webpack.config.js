const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/');

const config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    // 'webpack/hot/only-dev-server',
    `${APP_DIR}/app/index.jsx`,
  ],
  output: {
    path: BUILD_DIR,
    publicPath: './public/',
    filename: 'bundle.js',
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loaders: ['babel'],
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  postcss: () => [autoprefixer, precss],
};

module.exports = config;
