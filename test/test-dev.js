/**
 * Created by VicSolWang.
 * Date: 2020-02-16 21:50
 * Email: vic.sol.wang@gmail.com
 */

const childProcess = require('child_process');
const test = require('ava');

const workerProcess = childProcess.fork('src/index.js', [
	'build',
	'-c',
	'test/build/config.js',
]);
workerProcess.on('message', (msg) => {
	const { status } = msg || {};
	if (typeof status !== 'undefined') {
		test('Execute build command in the development environment to validate the result is correct.', (t) => {
			t.true(status);
			workerProcess.kill(2);
		});
	}
});
