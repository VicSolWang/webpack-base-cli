/**
 * Created by VicSolWang.
 * Date: 2020-01-25 8:20
 * Email: vic.sol.wang@gmail.com
 */

const config = require('../utils/getBuildConfig')();
const getConfig = require('../utils/getConfig');

module.exports = {
	// Presets in order from back to front.
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns:
					process.env.NODE_ENV === 'production'
					&& config.supportNewAPI
						? 'usage'
						: false,
				corejs:
					process.env.NODE_ENV === 'production'
					&& config.supportNewAPI
						? 3
						: null,
				targets: {
					browsers: require(getConfig('browserslist.js')),
				},
			},
		],
		'@babel/preset-react',
	],
	// Plugins in order from front to back.
	plugins: [
		// Stage 2.
		[
			'@babel/plugin-proposal-decorators',
			{
				legacy: true,
			},
		],
		// Stage 3.
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true,
			},
		],
		'@babel/plugin-transform-runtime',
		// Load antd on demand.
		[
			'import',
			{
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: 'css', // Load less file if it is true.
			},
			'antd',
		],
		[
			'import',
			{
				libraryName: 'antd-mobile',
				libraryDirectory: 'es',
				style: 'css',
			},
			'antd-mobile',
		],
		// React hot update.
		'react-hot-loader/babel',
	],
};
