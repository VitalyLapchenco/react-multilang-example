const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonWebpackConfig = require('./webpack.common.config');
const config = require('./config');

const loaders = config.getWebpackLoaders(true, config.isServerRunning);

module.exports = merge(commonWebpackConfig, {
  mode: 'development',

  output: {
    filename: 'bundle.dev.js',
    path: path.resolve(__dirname, config.paths.js),
    chunkFilename: '[id].[chunkhash].js',
  },

  devtool: 'inline-source-map',

  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    client: {
      logging: 'none',
    },
    compress: true,
    hot: config.isServerRunning, // instead webpack.HotModuleReplacementPlugin
    port: 3333,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: false,
    },
  },

  module: {
    rules: [
      // sass modules
      {
        test: /\.module\.s(a|c)ss$/i,
        use: [loaders.styleOrExtractCss, loaders.cssModules(), loaders.postCss, loaders.sass],
      },
      // global sass files
      {
        test: /\.s(a|c)ss$/i,
        exclude: /\.module\.s(a|c)ss$/i,
        use: [loaders.styleOrExtractCss, loaders.css(), loaders.postCss, loaders.sass],
      },
      // css modules
      {
        test: /\.module\.css$/i,
        use: [loaders.styleOrExtractCss, loaders.cssModules(), loaders.postCss],
      },
      // global css files
      {
        test: /\.css$/i,
        use: [loaders.styleOrExtractCss, loaders.css(), loaders.postCss],
        exclude: /\.module\.css$/i,
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      __PROD__: false,
    }),

    !config.isServerRunning && new MiniCssExtractPlugin({ filename: `${config.paths.css}/bundle.dev.css` }),

    config.isServerRunning &&
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
      }),

    config.isServerRunning &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
  ].filter(Boolean),
});
