const {Command, flags} = require('@oclif/command')
const  inquirer = require('inquirer')
const {parseConfigFile} = require('../lib/parse-file')
const {dvcs, currentRepo} = require('../lib/dvcs')
const {cli} = require('cli-ux')
const {createActionList} = require('../lib/create-action-list')
const chalk = require('chalk')

class RunCommand extends Command {
  async run() {
    const {flags} = this.parse(RunCommand)
    const {
      file: configFilePath,
      key: flagKey,
      value: flagValue,
      tag: tagEnabled,
      push: pushEnabled,
      'commit-message': commitMessage,
    } = flags

    let flagValues = []

    const currentRepoName = await currentRepo().catch(() => '')

    if (configFilePath) {
      flagValues = parseConfigFile(configFilePath)

      if (flagValues.length === 0) {
        this.log('Error - Empty config file provided')
        return
      }
    } else {
      flagValues.push(flagValue)
    }

    const actionList = createActionList(flagValues, flagKey, commitMessage)

    let columns = {
      index: {
        header: '#',
        minWidth: 4,
      },
      key: {
        minWidth: 7,
      },
      message: {
        header: 'Commit Message',
      },
    }

    if (tagEnabled) {
      columns.tagName = {header: 'Tag Name'}
      columns.tagMessage = {header: 'Tag Message'}
    }

    const plural = flagValues.length === 1 ? '' : 's'
    const tagLine = tagEnabled ? ` & tag${plural}` : ''
    const repoNameMsg = currentRepoName ? ` to "${currentRepoName}"` : ''
    const pushMessage = pushEnabled ? ` and ${chalk.redBright('will push to "origin"')}` : ', but will not push'

    this.log('\nSummary of activity:\n')

    cli.table(actionList, columns)

    this.log('')

    let responses = await inquirer.prompt([
      {
        name: 'confirmed',
        message: `About to add ${flagValues.length} commit${plural}${tagLine}${repoNameMsg}${pushMessage}. Proceed?`,
        type: 'confirm',
      },
    ])

    this.log('')

    const {confirmed} = responses

    if (!confirmed) return

    for (const action of actionList) {
      // eslint-disable-next-line no-await-in-loop
      const commitHash = await dvcs(action.message, action.tagName, action.tagMessage, {
        tagEnabled,
        pushEnabled,
      })
      this.log(`Commit${tagEnabled ? ' and tag ' : ' '}added for "${chalk.white(action.key)}" with hash: ${chalk.white(commitHash)}`)
    }

    this.log('\nAll done!\n')
  }
}

RunCommand.description = 'Batch create empty commits and tags to trigger CI activities'

RunCommand.examples = [
  `$ batch-commit run --key="foo" --value="var" --commit-message="Example Commit"
- Adds a single empty commit on the current branch with a commit message: "Example commit --foo=bar"
  `,
  `$ batch-commit run --key="foo" --file="./text.txt" --commit-message="Example Commit"
- Adds multiple commits using values using each line of "./text.txt" file: "Example commit --foo={line from file}"
  `,
  `$ batch-commit run --key="foo" --value="bar" --commit-message="Example Commit" --tag
- The --tag option will create a tag for the commit also
  `,
]

RunCommand.flags = {
  file: flags.string({
    char: 'c',
    multiple: false,
    exclusive: ['flag-value'],
    description: 'Path to a txt file with a new-line seperated list of values to be used as the --value',
  }),
  key: flags.string({
    char: 'f',
    multiple: false,
    required: true,
    description: 'The flag name to add to the commits',
  }),
  value: flags.string({
    char: 'v',
    multiple: false,
    description: 'The value passed to the key',
    exclusive: ['config-file'],
  }),
  tag: flags.boolean({
    description: 'Create tags along with commits',
    default: false,
  }),
  'commit-message': flags.string({
    char: 'm',
    multiple: false,
    required: true,
    description: 'The commit message prefix (used for all commits when used with --file)',
  }),
  push: flags.boolean({
    char: 'p',
    default: false,
    description: 'Push to the remote after each commit',
  }),
}

module.exports = RunCommand
