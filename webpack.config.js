const {resolve} = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = env => {
    const {ifProd, ifNotProd} = getIfUtils(env)

    return validate({
        entry: './demo/index.js',
        context: __dirname,
        output: {
            path: resolve(__dirname, './build'),
            filename: 'bundle.js',
            publicPath: '/build/',
            pathinfo: ifNotProd(),
        },
        devtool: ifProd('source-map', 'eval'),
        devServer: {
            port: 8080,
            historyApiFallback: true
        },
        module: {
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                {test: /\.css|\.styl/, loader: 'style-loader!css-loader!stylus-loader?resolve url'},
                {
                    test: /\.(png|gif|jpg|svg|woff|woff2|eot|ttf|ico)$/,
                    loader: 'file-loader'
                },
            ],
        },
        plugins: removeEmpty([
            new webpack.HotModuleReplacementPlugin(),
            ifProd(new webpack.optimize.DedupePlugin()),
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
                    context: path.join(__dirname, 'src'),
                }
            }),
            // ifProd(new webpack.LoaderOptionsPlugin({
            //     minimize: true,
            //     debug: false,
            //     quiet: true,
            // })),
            ifProd(new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                },
                __STYLES__: JSON.stringify("../../Markup.Kassa/markup/stylus/style_kassa.styl"),
            })),
            ifProd(new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    screw_ie8: true, // eslint-disable-line
                    warnings: false,
                },
            })),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ])
    });
};