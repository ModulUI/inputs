const webpack = require('webpack');
const config = require('../webpack/constants');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('../node_modules/webpack/lib/optimize/CommonsChunkPlugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [

  new WebpackChunkHash(),
  new CommonsChunkPlugin({
    // The order of this array matters
    names: ['common', 'vendor'],
    minChunks: 2,
  }),
  new CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
  }),
  new ChunkManifestPlugin({
    filename: 'manifest.json',
    manifestVariable: 'webpackManifest',
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    logger: ['common/utils/logger', 'default'],
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(config.NODE_ENV),
    },
    __API_URL__: JSON.stringify(config.app.api.apiUrl),
    __DEV__: config.IS_DEVELOPMENT,
    __DEV__TEST__: false,
    __DEV_TOOLS__: config.IS_DEVELOPMENT,
    __CLIENT__: true,
    __MARKUP_BUH_ADMIN__: JSON.stringify(config.app.markupBuhgalteria),
    __MARKUP_LOGIN__: JSON.stringify(config.app.markupLogin),
    __MARKUP_COMMON_404__: JSON.stringify(config.app.markupCommon404),
    __MARKUP_PORTAL__: JSON.stringify(config.app.markupPortal),
  }),
  new HtmlWebpackPlugin({
    template: path.join(config.sourcePath, 'index.html'),
    path: config.buildPath,
    filename: 'index.html',
    chunks: ['app', 'common', 'vendor', 'manifest'],
    favicon: path.join(config.sourcePath, 'favicon.ico'),
  }),
  new HtmlWebpackPlugin({
    template: path.join(config.sourcePath, 'signin.html'),
    path: config.buildPath,
    filename: 'signin.html',
    chunks: ['signin', 'common', 'vendor', 'manifest'],
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl'],
        preferPathResolver: 'webpack',
      },
      context: config.sourcePath,
    },
  }),
  new OpenBrowserPlugin({url: config.app.api.url}),
];


if (config.IS_PRODUCTION) {
  // Production plugins
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('[name]-[hash].css'),
    new CopyWebpackPlugin([
      {from: '../static/**/*', to: 'static'},
      {from: '../images', to: 'assets/images'},
    ]));
} else {
  // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin({port: config.app.port}),
    new webpack.NamedModulesPlugin()
  );
}

module.exports = plugins;
