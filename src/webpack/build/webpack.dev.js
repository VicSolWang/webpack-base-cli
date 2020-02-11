/**
 * Created by VicSolWang.
 * Date: 2020-01-23 11:33
 * Email: vic.sol.wang@gmail.com
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('../utils/getBuildConfig')();

module.exports = merge(common, {
	mode: 'development',
	output: {
		publicPath: config.path.devPublicPath,
		// When devserver is enabled, the compiled file will be saved in memory, which is invalid, but it must be set.
		path: config.path.dev,
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // Hot update module HMR.
		new webpack.NoEmitOnErrorsPlugin(), // If compile error, don't exit webpack process.
	],
	// Set the proxy server configs in the development environment.
	devServer: {
		port: config.devServerPort,
		proxy: {
			[config.devServerProxyPrefix]: {
				target: config.backEndServer,
				pathRewrite: {
					[`^${config.devServerProxyPrefix}`]: '',
				},
				changeOrigin: true,
				secure: false,
			},
		},
		hot: true,
	},
	devtool: 'eval-source-map',
});
