/**
 * Created by VicSolWang.
 * Date: 2020-01-23 11:33
 * Email: vic.sol.wang@gmail.com
 */

const HtmlResWebpackPlugin = require('html-res-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const fs = require('fs-extra');
const path = require('path');
const config = require('../utils/getBuildConfig')();
const getConfig = require('../utils/getConfig');

// Set htmlMinify configs.
const htmlMinifyConfig = {
	collapseWhitespace: true, // Collapse white space among tags.
	collapseInlineTagWhitespace: true, // Collapse white space of inline tag.
	removeComments: true,
	minifyJS: true,
	minifyCSS: true,
};

// Handle webpack entry.
const handleEntry = (entry) => {
	// Add core-js/stable and regenerator-runtime/runtime as polyfill in the production environment.
	if (process.env.NODE_ENV === 'production' && config.supportNewAPI) {
		const tempData = {};
		Object.keys(entry).forEach((item) => {
			tempData[item] = [
				'core-js/stable',
				'regenerator-runtime/runtime',
			].concat(entry[item]);
		});
		return tempData;
	}
	return entry;
};

// Set public webpack configs.
const webpackConfig = {
	entry: handleEntry(config.entry),
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						configFile: getConfig('babel.config.js'),
					},
				},
			},
			{
				test: /\.html$/,
				use: 'html-loader', // Exporting HTML as a string, it requires referencing static resources.
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				include: config.path.src,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240, // Convert it to Base64 if it is smaller than 10KB.
							name: `[name]${config.contenthash}.[ext]`,
							outputPath: 'images/',
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.ico$/,
				include: config.path.src,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
					},
				},
			},
		],
	},
	resolve: {
		// The directory is searched when parsing the module, with priority reduced from left to right.
		modules: [config.path.src, 'node_modules'],
		// Resolve the determined extension automatically, and no extension is needed when the module is introduced.
		extensions: [
			'.js',
			'.jsx',
			'.css',
			'.less',
			'.png',
			'.jpg',
			'.jpeg',
			'.gif',
			'.svg',
			'.ico',
			'.json',
		],
	},
	plugins: [],
};

// Add webpack plugins.
const addPlugins = (Plugin, opt) => {
	webpackConfig.plugins.push(new Plugin(opt));
};

// Copy library files directly to the output directory if the library exists.
const libsPath = path.resolve(config.path.src, 'libs/');
if (fs.pathExistsSync(libsPath)) {
	addPlugins(CopyWebpackPlugin, [
		{
			from: libsPath,
			to: 'libs/',
		},
	]);
}

// Add HtmlResWebacpk plugin for every HTML.
config.html.forEach((page) => {
	addPlugins(HtmlResWebpackPlugin, {
		mode: 'html', // Configure resources in HTML.
		env: process.env.NODE_ENV,
		filename: page.name,
		template: page.path, // HTML template path.
		favicon: config.favicon,
		// HTML compress config(For production environment).
		htmlMinify:
			process.env.NODE_ENV === 'production' ? htmlMinifyConfig : null,
	});
});

module.exports = webpackConfig;
