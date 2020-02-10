/**
 * Created by VicSolWang.
 * Date: 2020-01-25 13:18
 * Email: vic.sol.wang@gmail.com
 */

const fs = require('fs-extra');
const path = require('path');

const getPostCssConfig = () => {
	// Get root path of user's project.
	const rootPath = process.cwd();
	return fs.pathExistsSync(path.resolve(rootPath, 'postcss.config.js'))
		? rootPath
		: path.resolve(__dirname, '../config');
};

module.exports = getPostCssConfig;
