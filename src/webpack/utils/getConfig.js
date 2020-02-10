/**
 * Created by VicSolWang.
 * Date: 2020-01-25 13:18
 * Email: vic.sol.wang@gmail.com
 */

const fs = require('fs-extra');
const path = require('path');

const getConfig = (name) => {
	// Get root path of user's project.
	const rootPath = process.cwd();
	// Get config path of user.
	const userConfigPath = path.resolve(rootPath, name);
	// Get default config path.
	const defaultConfigPath = path.resolve(__dirname, `../config/${name}`);
	const userConfig = fs.pathExistsSync(userConfigPath) ? userConfigPath : '';
	const defaultConfig = fs.pathExistsSync(defaultConfigPath) ? defaultConfigPath : '';
	return userConfig || defaultConfig || null;
};

module.exports = getConfig;
