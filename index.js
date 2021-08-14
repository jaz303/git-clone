const impl = require('./private/impl');

module.exports = function(repo, targetPath, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = null;
    }

    opts = opts || {};
    cb = cb || function() {};

    impl(repo, targetPath, opts, cb, cb);
}
