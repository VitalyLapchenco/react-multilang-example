const path = require('path');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = process.env.NODE_ENV || 'development';
const __PROD__ = MODE === 'production';

const isServerRunning = process.env.WEBPACK_SERVE === 'true';
const shouldAnalyzeBuild = process.env.ANALYZE_BUILD === 'true';

const APP_ROOT = path.join(__dirname, '../');
const APP_SRC = path.resolve(APP_ROOT, 'src');

const getWebpackLoaders = (_isDev, _isServerRunning) => ({
  // if any postcss error happens
  // https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users
  postCss: {
    loader: 'postcss-loader',
    options: {
      implementation: require('postcss'),
      postcssOptions: {
        plugins: [['postcss-preset-env', { stage: 2 }], postcssFlexbugsFixes, autoprefixer],
      },
    },
  },
  sass: {
    loader: 'sass-loader',
    options: {
      sourceMap: _isDev,
      implementation: require.resolve('sass'),
      additionalData: '@import "src/assets/styles/abstracts/_index.scss";',
      sassOptions: {
        includePaths: [
          path.join(APP_SRC, 'assets/styles/abstracts/**/*.scss'),
        ],
      },
    },
  },
  css: ({ importLoaders = 2 } = {}) => ({
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders,
    },
  }),
  cssModules: ({ importLoaders = 2 } = {}) => ({
    loader: 'css-loader',
    options: {
      importLoaders,
      esModule: true,
      modules: {
        localIdentName: _isDev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
      },
      sourceMap: _isDev,
    },
  }),
  styleOrExtractCss: {
    loader: _isServerRunning ? 'style-loader' : MiniCssExtractPlugin.loader,
  },
});

const paths = {
  js: '../../../public/js/apps/tracking-system',
  css: '../../../design/css/apps/tracking-system', // relative to paths.js
  images: '../../../design/images/apps/tracking-system', // relative to paths.js
  svg: '../../../design/images/apps/tracking-system/icon', // relative to paths.js
};

const alias = {
  '@': APP_SRC,
  '@UI': path.resolve(APP_SRC, 'components/UI'),
};

module.exports = {
  // paths
  paths,

  // webpack configs
  alias,
  getWebpackLoaders,

  // other
  __PROD__,
  isServerRunning,
  shouldAnalyzeBuild,
};
