const impl = require('./private/impl');

module.exports = function(repo, targetPath, opts) {
    return new Promise((yes, no) => {
        impl(repo, targetPath, opts || {}, yes, no);
    });
}
