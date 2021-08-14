function git(opts) {
	return opts.git || 'git';
}

exports.buildCloneCommand = function(repo, targetPath, opts) {
	let args = ['clone'];
	const userArgs = opts.args || [];

	if (opts.shallow) {
		if (userArgs.indexOf('--depth') >= 0) {
			throw new Error("'--depth' cannot be specified when shallow is set to 'true'");
		}
		args.push('--depth', '1');
	}

	args = args.concat(userArgs);
	args.push('--', repo, targetPath);

	return [git(opts), args];
}

exports.buildCheckoutCommand = function(ref, opts) {
	return [git(opts), ['checkout', ref]];
}
