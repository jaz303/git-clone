# git-clone

Clone a git repository via `git` shell command.

## Installation

Install:

    $ npm install git-clone

To use the original callback-based API:

    const clone = require('git-clone');

As of 0.2.0 there's a promised-based API for use with `async`/`await`:

    const clone = require('git-clone/promise');

## API

## Common Options

  * `git`: path to `git` binary; default: `git` (expected to be in your `$PATH`)
  * `shallow`: when `true`, clone with depth 1
  * `checkout`: revision/branch/tag to check out after clone
  * `args`: additional array of arguments to pass to `git clone`

## Callback

#### `clone(repo, targetPath, [options], cb)`

Clone `repo` to `targetPath`, calling `cb` on completion; any error that occurred will be passed as the first argument. If no error is passed the `git clone` operation was successful.

## Promise

#### `async clone(repo, targetPath, [options])`

Clone `repo` to `targetPath`, throwing an exception on failure.

## Contributors

  - [AntiMoron](https://github.com/AntiMoron)

## Copyright &amp; License

&copy; 2014-2021 Jason Frame &amp; Contributors [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.
