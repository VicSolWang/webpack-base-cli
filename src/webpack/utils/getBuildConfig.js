/**
 * Created by VicSolWang.
 * Date: 2020-02-06 23:18
 * Email: vic.sol.wang@gmail.com
 */

const { Base64 } = require('js-base64');
const config = require('../config/buildConfig');

const getBuildConfig = () => {
	const buildConfigStr = process.env.WEBPACK_CONFIG;
	return buildConfigStr ? JSON.parse(Base64.decode(buildConfigStr)) : config;
};

module.exports = getBuildConfig;
