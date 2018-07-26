var gitClone = require('../src/index');
var gitClonePromise = require('../src/promise');

gitClone('git@github.com:jaz303/tpl-simple-site.git',
		'./test-checkout',
		{ checkout: 'a76362b0705d4126fa4462916cabb2506ecfe8e2' },
		() => console.log('success!')
	);

gitClonePromise('git@github.com:jaz303/tpl-simple-site.git',
		'./test-checkout',
		{ checkout: 'a76362b0705d4126fa4462916cabb2506ecfe8e2' },
	).then(() => console.log('success!'));
