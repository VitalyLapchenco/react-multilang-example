const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');

const config = require('./config');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.sass', '.scss', '.json'],
    alias: config.alias,
  },
  // error stats handled by @soda/friendly-errors-webpack-plugin
  stats: 'none', // none | detailed | verbose
  module: {
    rules: [
      {
        test: /\.ts(x?)$/i,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }, 'source-map-loader'
        ],
      },
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3000,
              name: `${config.paths.svg}/[name].[ext]`,
            },
          },
        ],
      },
      {
        test: /\.(avif|webp|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${config.paths.images}/[name].[ext]`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),

    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      failOnError: true,
    }),

    new WebpackBar({}),

    config.shouldAnalyzeBuild &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        openAnalyzer: true,
      }),
  ].filter(Boolean),
};
