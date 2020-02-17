/**
 * Created by VicSolWang.
 * Date: 2020-01-22 16:43
 * Email: vic.sol.wang@gmail.com
 */

const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');
const { Base64 } = require('js-base64');
const deepCopy = require('../utils/deepCopy');
const config = require('../webpack/config/buildConfig');

const command = 'build';

module.exports = {
	command,
	desc: 'Build the project',
	builder: (yargs) =>
		yargs
			.options({
				prod: {
					alias: 'p',
					describe: 'Set production environment',
					default: false,
					type: 'boolean',
				},
				config: {
					alias: 'c',
					describe: 'Set webpack config',
					type: 'string',
				},
			})
			.usage(`Usage: $0 ${command} [options]`)
			.example(`$0 ${command} -p false -t config.js`)
			.help()
			.alias('help', 'h'),
	handler: (argv) => {
		// Set webpack build config
		let buildConfig = config;
		if (argv.config && fs.pathExistsSync(argv.config)) {
			buildConfig = deepCopy(config, require(path.resolve(argv.config)));
		}
		// Use Base64 to encrypt the config
		const buildConfigStr = Base64.encode(JSON.stringify(buildConfig));
		// Child process executes build command
		const srcPath = path.resolve(__dirname, '..');
		const webpackConfigPath = path.resolve(
			srcPath,
			`webpack/build/webpack.${argv.prod ? 'prod' : 'dev'}.js`,
		);
		const webpackCommand = argv.prod
			? `cross-env NODE_ENV=production WEBPACK_CONFIG=${buildConfigStr} webpack --config ${webpackConfigPath}`
			: `cross-env NODE_ENV=development WEBPACK_CONFIG=${buildConfigStr} webpack-dev-server --open --config ${webpackConfigPath}`;
		const workerProcess = childProcess.exec(webpackCommand, {});
		// Print logs.
		workerProcess.stdout.on('data', (data) => {
			// eslint-disable-next-line no-console
			console.log(data);
			if (data.includes('Compiled')) {
				process.send({ status: data.includes('successfully') });
			}
		});
		workerProcess.stderr.on('data', (data) => {
			console.error(data);
		});
	},
};
