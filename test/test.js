const fs = require('fs');
const {execSync} = require('child_process');

const gitClone = {
	callback: require('../'),
	promise: require('../promise')
};

function assertGitRepoSync(dir, revision) {
	const stats = fs.statSync(`${dir}/.git`);
	return stats.isDirectory();
}

function assertCheckout(dir, expectedCheckout) {
	const checkedOut = execSync('git rev-parse HEAD', {cwd: dir, encoding: 'utf8'}).trim();
	return checkedOut === expectedCheckout;
}

let nextCheckoutId = 1;
function runTestCase(name, opts, fn) {
	const id = nextCheckoutId++;
	const targetDir = `./test-checkout-${Date.now()}-${id}`;

	fn(targetDir, opts, (err) => {
		if (err) {
			console.error(`Test '${name}' failed: ${err.message}`);
		} else if (!assertGitRepoSync(targetDir)) {
			console.error(`Test '${name}' failed: target directory is not a git repository`);
		} else if (opts && opts.checkout && !assertCheckout(targetDir, opts.checkout)) {
			console.error(`Test '${name}' failed: incorrect checkout`);
		} else {
			console.error(`Test '${name}': OK`);
		}
		execSync(`rm -rf ${targetDir}`);
	});
}

const callbackTest = (targetDir, options, onComplete) => {
	if (options === null) {
		gitClone.callback('git@github.com:jaz303/git-clone.git', targetDir, onComplete);
	} else {
		gitClone.callback('git@github.com:jaz303/git-clone.git', targetDir, options, onComplete);
	}
};

const promiseTest = async (targetDir, options, onComplete) => {
	try {
		await gitClone.promise('git@github.com:jaz303/git-clone.git', targetDir, options);
		onComplete(null);
	} catch (err) {
		onComplete(err);
	}
}

runTestCase('callback', {}, callbackTest);
runTestCase('callback (null options)', null, callbackTest); // tests argument juggling
runTestCase('callback with checkout', {checkout: 'ddb88d4d1dca74e8330eccb7997badd6a6906b98'}, callbackTest);
runTestCase('promise', {}, promiseTest);
runTestCase('promise with checkout', {checkout: 'ddb88d4d1dca74e8330eccb7997badd6a6906b98'}, promiseTest);
