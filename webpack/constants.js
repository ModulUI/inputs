const path = require('path')
const appConfig = {
    'api': {
        'url': 'http://localhost'
    },
    'host': 'localhost',
    'port': 8080,
    'markupStyle': '../../Markup.Kassa/markup/stylus/style_kassa.styl'
}
const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_DEVELOPMENT = NODE_ENV === 'development'
const IS_PRODUCTION = NODE_ENV === 'production'
const jsSourcePath = path.join(__dirname, '../demo')
const nodeModules = path.resolve(__dirname, '../node_modules')
const buildPath = path.join(__dirname, '../build')
const sourcePath = path.join(__dirname, '../demo')

module.exports = {
    IS_DEVELOPMENT,
    IS_PRODUCTION,
    NODE_ENV,
    jsSourcePath,
    buildPath,
    sourcePath,
    nodeModules,
    app: appConfig
}
