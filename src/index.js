#! /usr/bin/env node

/**
 * Created by VicSolWang.
 * Date: 2020-01-22 15:45
 * Email: vic.sol.wang@gmail.com
 */

const yargs = require('yargs') // eslint-disable-line
	.commandDir('cli')
	.demandCommand()
	.help()
	.alias({
		help: 'h',
		version: 'v',
	}).argv;
