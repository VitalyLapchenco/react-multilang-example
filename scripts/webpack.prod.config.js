const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonWebpackConfig = require('./webpack.common.config');
const config = require('./config');

const loaders = config.getWebpackLoaders(false, config.isServerRunning);

const MODE = 'production';

module.exports = merge(commonWebpackConfig, {
  mode: MODE,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, config.paths.js),
  },

  devtool: false,

  module: {
    rules: [
      // sass modules
      {
        test: /\.module\.s(a|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          loaders.cssModules(),
          loaders.postCss,
          loaders.sass
        ],
      },
      // global sass files
      {
        test: /\.s(a|c)ss$/i,
        exclude: /\.module\.s(a|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          loaders.css(),
          loaders.postCss,
          loaders.sass,
        ],
      },
      // css modules
      {
        test: /\.module\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          loaders.cssModules(),
          loaders.postCss
        ],
      },
      // global css files
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          loaders.css(),
          loaders.postCss,
        ],
        exclude: /\.module\.css$/i,
      },
    ],
  },

  optimization: {
    nodeEnv: MODE,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/,
        extractComments: false,
        terserOptions: {
          parse: {
            html5_comments: false,
          },
          mangle: true,
          sourceMap: false,
          compress: {
            defaults: true,
            drop_console: false, // false by default. Pass true to discard calls to console.* functions.
            keep_infinity: true, // false by default. Pass true to prevent Infinity from being compressed into 1/0, which may cause performance issues on Chrome.
            passes: 2, // 1 by default. The maximum number of times to run compress.
          },
          format: {
            comments: false, // "some" by default
            preamble: null, // null by default. When passed it must be a string and it will be prepended to the output literally. The source map will adjust for this text. Can be used to insert a comment containing licensing information, for example.
            quote_style: 3, // 0 by default. 3 - always use the original quotes.
            preserve_annotations: false, // false by default.
            ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
          },
          ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
          keep_classnames: false, // undefined by default.
          keep_fnames: false, // false by default.
          safari10: false, // false by default.
        },
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: `${config.paths.css}/bundle.css` }),

    new CompressionPlugin({ test: /\.(js|css)$/ }),

    new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true,
    }),

    !config.isServerRunning && new MiniCssExtractPlugin({ filename: `${config.paths.css}/bundle.css` }),
  ],
});
