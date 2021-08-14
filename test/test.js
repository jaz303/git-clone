var gitClone = require('../index');

gitClone('git@github.com:jaz303/git-clone.git', './test-checkout', (err) => {
	console.log("complete!");
	console.log(err);
});
