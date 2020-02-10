/**
 * Created by VicSolWang.
 * Date: 2020-02-06 23:18
 * Email: vic.sol.wang@gmail.com
 */

const { Base64 } = require('js-base64');
const config = require('../config/buildConfig');

const getBuildConfig = () => (process.env.WEBPACK_CONFIG
	? JSON.parse(Base64.decode(process.env.WEBPACK_CONFIG))
	: config);

module.exports = getBuildConfig;
