/**
 * Created by VicSolWang.
 * Date: 2020-01-25 11:41
 * Email: vic.sol.wang@gmail.com
 */

const getConfig = require('../utils/getConfig');

module.exports = {
	plugins: [
		require('postcss-import')(),
		require('autoprefixer')({
			browsers: require(getConfig('browserslist.js')),
		}),
	],
};
