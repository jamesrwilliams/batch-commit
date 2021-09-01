git-via-node
============

An experiment in interacting with git via node

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g git-via-node
$ git-via-node COMMAND
running command...
$ git-via-node (-v|--version|version)
git-via-node/1.0.0 darwin-x64 node-v16.4.2
$ git-via-node --help [COMMAND]
USAGE
  $ git-via-node COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`git-via-node help [COMMAND]`](#git-via-node-help-command)
* [`git-via-node run`](#git-via-node-run)

## `git-via-node help [COMMAND]`

display help for git-via-node

```
USAGE
  $ git-via-node help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `git-via-node run`

Our main entrypoint to adding auto-commits and tags

```
USAGE
  $ git-via-node run

OPTIONS
  -c, --file=file                      Path to a txt file with a linebreak seperated list of values to be used with the
                                       --flag-key argument

  -f, --key=key                        (required) The flag we're adding to each commit

  -m, --commit-message=commit-message  (required) The commit message prefix (used for all commits when used with
                                       --config-file)

  -v, --value=value                    The commit message argument to pass to each commit

  --tag                                Create a tag with this commit also

DESCRIPTION
  ...
```

_See code: [src/commands/run.js](https://github.com/jamesrwilliams/git-via-node/blob/v1.0.0/src/commands/run.js)_
<!-- commandsstop -->

## Built with

- [steveukx/git-js](https://github.com/steveukx/git-js)
- [oclif/oclif](https://github.com/oclif/oclif)
