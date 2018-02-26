/*eslint-disable*/
const webpack = require('webpack');
/* eslint-enable */
const config = require('./webpack/constants')
const plugins = require('./webpack/plugins')
const rules = require('./webpack/rules')
const devServer = require('./webpack/devServer')

const buildEntryPoint = (point) => {
    if (config.IS_PRODUCTION) { return point }
    return [point, 'webpack/hot/only-dev-server', `webpack-dev-server/client?http://${config.app.host}:${config.app.port}`]
}

module.exports = {
    devtool: config.IS_PRODUCTION ? 'source-map' : 'eval-source-map',
    context: config.jsSourcePath,
    entry: {app: buildEntryPoint('./index')},
    output: {
        path: config.buildPath,
        publicPath: '/',
        filename: '[name]-[hash].js'
    },
    module: {
        rules
    },
    externals: {
        jsdom: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'react-dom/test-utils': true,
        'react-test-renderer/shallow': true
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.svg', '.ttf', '.woff', '.woff2'],
        modules: [
            config.nodeModules,
            config.jsSourcePath
        ]
    },
    plugins,
    devServer
}
