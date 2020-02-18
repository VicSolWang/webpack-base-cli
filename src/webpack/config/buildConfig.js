/**
 * Created by VicSolWang.
 * Date: 2020-01-22 14:30
 * Email: vic.sol.wang@gmail.com
 */

const path = require('path');
const filePathUtil = require('../utils/filePathUtil');
const ignoreFiles = require('../utils/ignoreFiles');

// Get root path of user's project.
const rootPath = process.cwd();

const buildConfig = {
	path: {
		// The absolute path of client code directory, which is src by default.
		src: path.resolve(rootPath, 'src'),
		// The target path of building output file in the development environment, which is dev by default.
		dev: path.resolve(rootPath, 'dev'),
		// The target path of building output file in the production environment, which is output by default.
		prod: path.resolve(rootPath, 'output'),
		// The static resource URL prefix in the development environment, which relative to HTML page and is / by default. Note: webpack-dev-server is based on it.
		devPublicPath: '/',
		// The static resource URL prefix in the production environment, which relative to HTML page and is empty by default.
		prodPublicPath: '',
	},
	// The port of node proxy server in the development environment, which is 8888 by default.
	devServerPort: 8888,
	// The request prefix of node proxy server in the development environment, which is /api by default.
	devServerProxyPrefix: '/api',
	// Back end service address, which is empty by default.
	backEndServer: '',
	// Engineering level hash, which is 6 bits by default. Note: All files in the same construction process have the same hash value. As long as there are changes in files of the project, the hash value of the whole project will change. It means no cache.
	hash: '-[hash:6]',
	// According to different entries, parse the dependency file, built the corresponding chunk, and generate the corresponding hash value which is 6 bits by default. Note: even if JS and CSS are separated from the same module, the hash value is the same. When modify one place, all of them will change. It means no cache.
	chunkhash: '-[chunkhash:6]',
	// The hash value generated by the file content, which is used usually by CSS files and is 6 bits by default.
	contenthash: '-[contenthash:6]',
	// Whether open babel-polyfill in the production environment, the default is enabled.
	supportNewAPI: true,
	// Whether compress images in the production environment, the default is enabled.
	imageCompress: true,
};
// Scan automatically HTML files in the client directory.
buildConfig.html = filePathUtil.getHtmlFile(buildConfig.path.src);
// Scan automatically entry JS files in the client directory, which is src/index.js(.jsx) or src/xxx/index.js(.jsx) by default.
buildConfig.entry = filePathUtil.getJsFile(
	buildConfig.path.src,
	'',
	'index',
	['js', 'jsx'],
	ignoreFiles,
);
// Scan automatically the ico file named favicon in the client directory.
buildConfig.favicon = path.resolve(buildConfig.path.src, 'favicon.ico');

module.exports = buildConfig;
