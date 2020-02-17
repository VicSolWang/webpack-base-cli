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


# License

[MIT](LICENSE).
