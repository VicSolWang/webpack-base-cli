/**
 * Created by VicSolWang.
 * Date: 2020-01-23 11:34
 * Email: vic.sol.wang@gmail.com
 */

const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const common = require('./webpack.common');
const config = require('../utils/getBuildConfig')();
const postCssConfig = require('../utils/getPostCssConfig')();

module.exports = merge(common, {
	mode: 'production',
	output: {
		publicPath: config.path.prodPublicPath,
		path: config.path.prod,
		filename: `js/[name]${config.chunkhash}.js`,
		chunkFilename: `js/[name]${config.chunkhash}.js`,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: postCssConfig,
							},
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: postCssConfig,
							},
						},
					},
					'less-loader',
				],
			},
		],
	},
	optimization: {
		// Split the third-party library code into vendor.js and vendor.css according to the default settings.
		splitChunks: {
			chunks: 'all',
			name: 'vendor',
		},
		minimizer: [
			// Compress JS code
			new UglifyJsPlugin({
				cache: true, // Enable file caching.
				parallel: true, // Use multi-process parallel running to improve the build speed.
			}),
			// Compress CSS code. Note: when specify optimization.minizer to use this compression library, the built-in code compression in production mode will be discarded. You need to specify JS compression library again.
			new OptimizeCssAssetsPlugin(),
		],
	},
	plugins: [
		// Remove previous output files before building, and the output directory itself is not included by default.
		new CleanWebpackPlugin(),
		// MiniCssExtractPlugin options. Extract CSS style into separate files in the directory named css by default.
		new MiniCssExtractPlugin({
			filename: `css/[name]${config.contenthash}.css`,
			chunkFilename: `css/[name]${config.contenthash}.css`,
		}),
		// Compress images
		new ImageminPlugin({
			disable: !config.imageCompress,
			pngquant: {
				quality: '65-90',
			},
			plugins: [
				imageminMozjpeg({
					quality: 65,
					progressive: true,
				}),
			],
		}),
	],
});
