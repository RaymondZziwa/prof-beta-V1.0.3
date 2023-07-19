const path = require('path');
const zlib = require('browserify-zlib');
const stream = require('stream-browserify');
const webpack = require('webpack');
const Buffer = require('buffer').Buffer;

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve('path-browserify'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
  };

  // Add polyfill for process
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  return config;
};
