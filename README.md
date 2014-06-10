# git-clone

Clone a git repository.

## Installation

Install:

	$ npm install git-clone

Require:

	var clone = require('git-clone');

## API

#### `clone(repo, targetPath, [options], cb)`

Clone `repo` to `targetPath`, calling `cb` on completion.

Supported `options`:

  * `shallow`: clone with depth of 1

## Copyright &amp; License

&copy; 2014 Jason Frame [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.
