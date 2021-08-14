const {
    buildCloneCommand,
    buildCheckoutCommand
} = require('./private/util');

const spawn = require('child_process').spawn;

module.exports = function(repo, targetPath, opts, cb) {

    if (typeof opts === 'function') {
        cb = opts;
        opts = null;
    }

    opts = opts || {};

    const [cmd, args] = buildCloneCommand(repo, targetPath, opts);
    const proc = spawn(cmd, args);
    proc.on('close', (status) => {
        if (status == 0) {
            if (opts.checkout) {
                _checkout();
            } else {
                cb && cb();    
            }
        } else {
            cb && cb(new Error("'git clone' failed with status " + status));
        }
    });

    function _checkout() {
        const [cmd, args] = buildCheckoutCommand(opts.checkout, opts);
        const proc = spawn(cmd, args, { cwd: targetPath });
        proc.on('close', function(status) {
            if (status == 0) {
                cb && cb();
            } else {
                cb && cb(new Error("'git checkout' failed with status " + status));
            }
        });
    }

}
