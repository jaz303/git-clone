const spawnSync = require('child_process').spawnSync;
const makePlan = require('./private/planner');

module.exports = function gitCloneSync(repo, targetPath, opts) {
    const plan = makePlan(repo, targetPath, opts);

    // TODO: synchronous ops
}