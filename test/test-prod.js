/**
 * Created by VicSolWang.
 * Date: 2020-02-16 21:54
 * Email: vic.sol.wang@gmail.com
 */

const fs = require('fs-extra');
const childProcess = require('child_process');
const shell = require('shelljs');
const test = require('ava');

const output = 'test/output';

const pathExists = (path) => fs.pathExistsSync(path);

const includeFilesNums = (path) =>
	fs
		.readdirSync(path)
		.filter((item) => /^(index|vendor)-.*\.(js|css)$/.test(item)).length;

shell.rm('-rf', output);
const workerProcess = childProcess.fork('src/index.js', [
	'build',
	'-p',
	true,
	'-c',
	'test/build/config.js',
]);
workerProcess.on('message', (msg) => {
	const { status } = msg || {};
	if (typeof status !== 'undefined') {
		test('Execute build command in the production environment to validate the result is correct.', (t) => {
			t.true(status);
			t.true(pathExists(output));
			t.true(pathExists(`${output}/index.html`));
			t.true(pathExists(`${output}/js`));
			t.true(pathExists(`${output}/css`));
			t.is(includeFilesNums(`${output}/js`), 2);
			t.is(includeFilesNums(`${output}/css`), 2);
			shell.rm('-rf', output);
		});
	}
});
