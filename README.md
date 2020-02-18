# webpack-base-cli

[![NPM version](https://img.shields.io/npm/v/webpack-base-cli)](https://www.npmjs.com/package/webpack-base-cli)
[![node](https://img.shields.io/node/v/webpack-base-cli)](https://nodejs.org)
[![Build Status](https://travis-ci.com/VicSolWang/webpack-base-cli.svg?branch=master)](https://travis-ci.com/VicSolWang/webpack-base-cli)
[![codecov](https://codecov.io/gh/VicSolWang/webpack-base-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/VicSolWang/webpack-base-cli)
[![NPM downloads](https://img.shields.io/npm/dt/webpack-base-cli)](https://www.npmjs.com/package/webpack-base-cli)

Use webpack to build project

# Installation

    npm install --save-dev webpack-base-cli

# Usage

    webpack-base-cli build [options]

## Command options

    -p, --prod       Set production environment    [boolean] [default: false]
    -c, --config     Set webpack config            [string]
    -v, --version    Show version number
    -h, --help       Show help


### Example

    webpack-base-cli build -p true  -c config.js

#### Description
Default configuration is recommended, including config.js, babel.config.js, postcss.config.js, browserslist.js and other files. You can also configure these files by yourself, provided they are placed in the root directory of your project.

The default configuration of config.js is roughly as follows:

    const path = require('path');

    const config = {
	    path: {
            src: path.resolve(process.cwd(), 'src'),
            dev: path.resolve(process.cwd(), 'dev'),
            prod: path.resolve(process.cwd(), 'output'),
            devPublicPath: '/',
            prodPublicPath: '',
	    },
	    devServerPort: 8888,
	    backEndServer: '',
	    hash: '-[hash:6]',
	    chunkhash: '-[chunkhash:6]',
	    contenthash: '-[contenthash:6]',
	    supportNewAPI: true,
	    imageCompress: true,
	    html: [{
	        name: 'index.html',
	        path: path.resolve(process.cwd(), 'src/index.html'),
        }],
	    entry: {
	        index: [path.resolve(process.cwd(), 'src/index.js')]
	    },
	    favicon: path.resolve(process.cwd(), 'src/favicon.ico'),
    };

Note: generally speaking, you only need to configure path.prodPublicPath and backEndServer in your own config.js.

# License

[MIT](LICENSE).
