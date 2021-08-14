const impl = require('./index');

module.exports = function(repo, targetPath, opts) {
    return new Promise((yes, no) => {
        impl(repo, targetPath, opts, (err) => {
            err ? no(err) : yes();
        });
    });
}
