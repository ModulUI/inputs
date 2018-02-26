const merge = require('webpack-merge');
const fs = require('fs');
const path = require('path');

module.exports = function (server) {
  const _path = `./config.${ server || 'dev' }.json`;
  if (fs.existsSync(path.resolve(__dirname, _path))) {
    return merge(
			require('./config.json'),
			require(_path)
		);
  }
  return require('./config.json');
};
