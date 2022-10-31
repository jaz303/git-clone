const gitClone = require('../');

gitClone('git@github.com:torvalds/linux.git', 'linux', {
	progress: (evt) => {
		console.log(evt);
	}
}, () => {
	console.log("done!");
});