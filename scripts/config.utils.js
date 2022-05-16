const path = require("path");
const autoprefixer = require("autoprefixer");
const postcssFlexbugsFixes = require("postcss-flexbugs-fixes");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getPublicPathOrUrl = ({isDevEnvironment, isTestMode, isServerRunning}) => {
  if (isServerRunning) {
    return '/'
  }
  if (isTestMode) {
    return 'https://www.searates.dev/'
  }
  if (isDevEnvironment) {
    return 'https://www.searates.loc/'
  }
  // if production
  return 'https://www.searates.com/'
}

const relativePathToAbsolute = (relativePath, publicPath) => {
  // relativePath example
  // "../../../../design/images/apps/<your_app>/test.png"
  // "/design/images/apps/<your_app>/test.png" - after first replace
  // /design/images/apps/<your_app>/test.png" - after second replace
  // /design/images/apps/<your_app>/test.png - after third replace
  return publicPath
    .concat(relativePath
      .replace(/\.\.\/+/gmi, "")
      .replace(/^"/gmi, "")
      .replace(/"$/gmi, "")
    )
}

const configurePath = (paths, isServerRunning) => {
  if (!isServerRunning) {
    return paths
  }

  return Object.keys(paths).reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {})
}

const getWebpackLoaders = ({ APP_SRC, isDevEnvironment, isServerRunning }) => ({
  // if any postcss error happens
  // https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users
  postCss: {
    loader: 'postcss-loader',
    options: {
      implementation: require('postcss'),
      postcssOptions: {
        plugins: [['postcss-preset-env', {stage: 2}], postcssFlexbugsFixes, autoprefixer],
      },
    },
  },
  sass: {
    loader: 'sass-loader',
    options: {
      sourceMap: isDevEnvironment,
      implementation: require('sass'),
    },
  },
  css: ({importLoaders = 2} = {}) => ({
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders,
    },
  }),
  cssModules: ({importLoaders = 2} = {}) => ({
    loader: 'css-loader',
    options: {
      importLoaders,
      esModule: true,
      modules: {
        localIdentName: isDevEnvironment ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
      },
      sourceMap: isDevEnvironment,
    },
  }),
  styleOrExtractCss: {
    loader: isServerRunning ? 'style-loader' : MiniCssExtractPlugin.loader,
  },
});

const getRules = ({ paths, isDevEnvironment, isTestMode, isServerRunning }) => ({
  images: {
    test: /\.(avif|webp|png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: paths.images,
          name: '[name].[ext]',
          publicPath: relativePathToAbsolute(paths.images, getPublicPathOrUrl({
            isDevEnvironment,
            isTestMode,
            isServerRunning
          }))
        },
      },
    ],
  },
  svg: {
    test: /\.svg$/i,
    exclude: /node_modules/,
    use: [
      '@svgr/webpack',
      {
        loader: 'url-loader',
        options: {
          limit: 3000,
          name: '[name].[ext]',
          outputPath: paths.svg,
          publicPath: relativePathToAbsolute(paths.svg, getPublicPathOrUrl({
            isDevEnvironment: true,
            isTestMode,
            isServerRunning,
          }))
        },
      },
    ],
  }
})

module.exports = {
  getPublicPathOrUrl,
  getWebpackLoaders,
  getRules,
  configurePath,
};
