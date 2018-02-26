const webpack = require('webpack')
const config = require('../webpack/constants')
const path = require('path')
const autoprefixer = require('autoprefixer')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const plugins = [

    new WebpackChunkHash(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        logger: ['common/utils/logger', 'default']
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(config.NODE_ENV)
        },
        __DEV__: config.IS_DEVELOPMENT,
        __STYLES__: JSON.stringify(config.app.markupStyle)
    }),
    new HtmlWebpackPlugin({
        template: path.join(config.sourcePath, 'index.html'),
        path: config.buildPath,
        filename: 'index.html',
        chunks: ['app', 'common', 'vendor', 'manifest']
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer({
                    browsers: [
                        'last 3 version',
                        'ie >= 10'
                    ]
                })
            ],
            stylus: {
                use: [require('nib')()],
                import: ['~nib/lib/nib/index.styl'],
                preferPathResolver: 'webpack'
            },
            context: config.sourcePath
        }
    })
]

if (config.IS_PRODUCTION) {
    // Production plugins
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
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
                join_vars: true
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin('[name]-[hash].css'))
} else {
    // Development plugins
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    )
}

module.exports = plugins
