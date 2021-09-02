batch-commit
============

An experiment in interacting with git via node by adding bulk commits via a node CLI.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

## Setup

- Download repository
- Install dependencies
- Run `npm link` to make `batch-commit` available in other directories

# Usage
<!-- usage -->
```sh-session
$ npm install -g batch-commit
$ batch-commit COMMAND
running command...
$ batch-commit (-v|--version|version)
batch-commit/2.0.0 darwin-x64 node-v16.4.2
$ batch-commit --help [COMMAND]
USAGE
  $ batch-commit COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`batch-commit help [COMMAND]`](#batch-commit-help-command)
* [`batch-commit run`](#batch-commit-run)

## `batch-commit help [COMMAND]`

display help for batch-commit

```
USAGE
  $ batch-commit help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `batch-commit run`

Batch create empty commits and tags to trigger CI activities

```
USAGE
  $ batch-commit run

OPTIONS
  -c, --file=file                      Path to a txt file with a new-line seperated list of values to be used as the
                                       --value

  -f, --key=key                        (required) The flag name to add to the commits

  -m, --commit-message=commit-message  (required) The commit message prefix (used for all commits when used with --file)

  -v, --value=value                    The value passed to the key

  --tag                                Create tags along with commits

DESCRIPTION
  ...
```

_See code: [src/commands/run.js](https://github.com/jamesrwilliams/git-via-node/blob/v2.0.0/src/commands/run.js)_
<!-- commandsstop -->

## Built with

- [steveukx/git-js](https://github.com/steveukx/git-js)
- [oclif/oclif](https://github.com/oclif/oclif)
