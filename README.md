# batch-commit

Automate commits to a repository with batch commits and tagging.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io) [![Project 
Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/1261f9890f7e492485601fbf4356b252)](https://www.codacy.com/gh/jamesrwilliams/batch-commit/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jamesrwilliams/batch-commit&amp;utm_campaign=Badge_Grade)

<!-- toc -->

<!-- tocstop -->

## Installation

```shell
npm i -g batch-commit
```

## Development Setup  

1. Clone repository:
2. Install dependencies: `yarn install`
3. Run `npm link` to make `batch-commit` available in other directories

## Usage
<!-- usage -->
```sh-session
$ npm install -g batch-commit
$ batch-commit COMMAND
running command...
$ batch-commit (-v|--version|version)
batch-commit/2.2.0 darwin-x64 node-v16.4.2
$ batch-commit --help [COMMAND]
USAGE
  $ batch-commit COMMAND
...
```
<!-- usagestop -->
## Commands
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

  -p, --push                           Push to the remote after each commit

  -v, --value=value                    The value passed to the key

  --tag                                Create tags along with commits

EXAMPLES
  $ batch-commit run --key="foo" --value="var" --commit-message="Example Commit"
  - Adds a single empty commit on the current branch with a commit message: "Example commit --foo=bar"
  
  $ batch-commit run --key="foo" --file="./text.txt" --commit-message="Example Commit"
  - Adds multiple commits using values using each line of "./text.txt" file: "Example commit --foo={line from file}"
  
  $ batch-commit run --key="foo" --value="bar" --commit-message="Example Commit" --tag
  - The --tag option will create a tag for the commit also
```

_See code: [src/commands/run.js](https://github.com/jamesrwilliams/git-via-node/blob/v2.2.0/src/commands/run.js)_
<!-- commandsstop -->

## Built with

- [steveukx/git-js](https://github.com/steveukx/git-js)
- [oclif/oclif](https://github.com/oclif/oclif)
