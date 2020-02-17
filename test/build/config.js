/**
 * Created by VicSolWang.
 * Date: 2020-02-16 22:26
 * Email: vic.sol.wang@gmail.com
 */

const path = require('path');

const rootPath = path.resolve(process.cwd(), 'test');

const buildConfig = {
	path: {
		src: path.resolve(rootPath, 'src'),
		dev: path.resolve(rootPath, 'dev'),
		prod: path.resolve(rootPath, 'output'),
		prodPublicPath: '/test/',
	},
	backEndServer: 'http://127.0.0.0:8889/',
	entry: {},
};

buildConfig.html = [
	{
		name: 'index.html',
		path: path.resolve(buildConfig.path.src, 'index.html'),
	},
];

buildConfig.entry = {
	index: path.resolve(buildConfig.path.src, 'index.js'),
};

module.exports = buildConfig;
