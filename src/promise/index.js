var gitClone = require('../index');
var promisify = require("es6-promisify").promisify;

module.exports = promisify(gitClone);
