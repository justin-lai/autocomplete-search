module.exports = function(grunt) {
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.js');
  grunt.initConfig({
    webpack: {
      options: webpackConfig,
      build: {
        plugins: webpackConfig.plugins.concat(
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        ),
      },
      'build-dev': {
        devtool: 'sourcemap',
        debug: true,
      },
    },
    'webpack-dev-server': {
      options: {
        webpack: webpackConfig,
        publicPath: `/${webpackConfig.output.publicPath}`,
      },
      start: {
        keepAlive: true,
        webpack: {
          devtool: 'eval',
          debug: true,
        },
      },
    },
  });

  grunt.registerTask('start', ['webpack-dev-server:start']);

  grunt.registerTask('dev', ['webpack:build-dev']);

  grunt.registerTask('build', ['webpack:build']);
};
