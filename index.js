var childProcess = require('child_process');

var GITCLONE_PROCESS_HANDLED_EVENTS = ['disconnect', 'error', 'exit', 'message', 'channel'];
// Wrap off differences between sync processes and async ones.
function processOn(process, sync, event, listener) {
	if (!sync) {
		process.on(event, listener);
	} else {
		switch (event) {
			case 'exit':
			case 'close':
				listener && listener(process.status, process.signal);
				break;
			case 'disconnect':
				listener && listener();
				break;
			case 'error':
				listener && listener(process.error);
				break;
			case 'message':
			case 'channel':
				// event type omitted.
				break;
		}
	}
}

/**
 *
 * @param {string} repo repo's clone path
 * @param {string} targetPath save path
 * @param {Object} opts options
 * @param {function} cb callback function
 * @param {function} el event listener, $0 process, $1 event, $2 & $3 callback params.
 * @return {promise}
 */
module.exports = function (repo, targetPath, opts, cb, el) {

	if (typeof opts === 'function') {
		el = cb;
		cb = opts;
		opts = null;
	}

	opts = opts || {};
	// get spawn method.
	var isSync = opts.sync;
	var spawn = opts.sync ? childProcess.spawnSync : childProcess.spawn;
	var git = opts.git || 'git';
	var args = ['clone'];
	// Make it able to add user defined arguments.
	// checking user defined args whether being conflict with default ones.
	var userDefinedArgs = opts.args || [];

	if (opts.shallow) {
		if (userDefinedArgs.find(_ => v.trim() === '--depth')) {
			reject(new Error("You cannot specify `--depth` by yourself when shallow is set `true`"));
			return;
		}
		args.push('--depth');
		args.push('1');
	}
	args.push('--');
	args.push(repo);
	args.push(targetPath);

	if (opts.progress) {
		args.push('--progress');
	}
	args = args.concat(userDefinedArgs);

	var process = spawn(git, args);
	// Add listener.
	GITCLONE_PROCESS_HANDLED_EVENTS.forEach(event => {
		processOn(process, isSync, event, function (process, par0, par1) {
			el && el(process, event, par0, par1);
		});
	})

	function resultHandling(resolve, reject) {
		processOn(process, isSync, 'close', function (status) {
			if (status == 0) {
				if (opts.checkout) {
					_checkout();
				} else {
					resolve();
				}
			} else {
				reject(new Error("'git clone' failed with status " + status));
			}
		})
		function _checkout() {
			var args = ['checkout', opts.checkout];
			var coProcess = spawn(git, args, { cwd: targetPath });
			processOn(coProcess, isSync, 'close', function (status) {
				if (status == 0) {
					resolve();
				} else {
					reject(new Error("'git checkout' failed with status " + status));
				}
			});
		}
	}

	if (opts.promise) {
		if (typeof Promise === 'undefined') {
			throw new Error("[git-clone] <error>: Promise not supported. You cannot use promise.");
		}
		return new Promise(resultHandling);
	} else {
		resultHandling(cb, cb);
	}
}
