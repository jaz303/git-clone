const {
    buildCloneCommand,
    buildCheckoutCommand
} = require('./util');

const spawn = require('child_process').spawn;

module.exports = function clone(repo, targetPath, opts, onSuccess, onError) {
	const [cmd, args] = buildCloneCommand(repo, targetPath, opts);
    const proc = spawn(cmd, args);
    proc.on('close', (status) => {
        if (status == 0) {
            if (opts.checkout) {
                _checkout();
            } else {
            	onSuccess();   
            }
        } else {
            onError(new Error("'git clone' failed with status " + status));
        }
    });

    function _checkout() {
        const [cmd, args] = buildCheckoutCommand(opts.checkout, opts);
        const proc = spawn(cmd, args, { cwd: targetPath });
        proc.on('close', function(status) {
            if (status == 0) {
                onSuccess();
            } else {
                onError(new Error("'git checkout' failed with status " + status));
            }
        });
    }
}
