const {Command, flags} = require('@oclif/command')
const  inquirer = require('inquirer')
const {parseConfigFile} = require('../lib/parse-file')
const {dvcs, currentRepo} = require('../lib/dvcs')
const {cli} = require('cli-ux')
const {createActionList} = require('../lib/create-action-list')

class RunCommand extends Command {
  async run() {
    const {flags} = this.parse(RunCommand)
    const {
      file: configFilePath,
      key: flagKey,
      value: flagValue,
      tag: tagEnabled,
      'commit-message': commitMessage,
    } = flags

    let flagValues = []

    const currentRepoName = await currentRepo()

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

    cli.table(actionList, columns)

    this.log('\n')

    const plural = flagValues.length === 1 ? '' : 's'
    const tagLine = tagEnabled ? `& tag${plural}` : ''

    let responses = await inquirer.prompt([
      {
        name: 'confirmed',
        message: `About to add ${flagValues.length} commit${plural} ${tagLine}to "${currentRepoName}", but will not push. Proceed?`,
        type: 'confirm',
      },
    ])

    const {confirmed} = responses

    if (!confirmed) return

    for (const action of actionList) {
      // eslint-disable-next-line no-await-in-loop
      await dvcs(action.message, action.tagName, action.tagMessage, tagEnabled)
      this.log(`Commit${tagEnabled ? ' and tag ' : ' '}added for "${action.key}"`)
    }

    this.log('\nDone!')
  }
}

RunCommand.description = `Our main entrypoint to adding auto-commits and tags
...
`

RunCommand.flags = {
  file: flags.string({
    char: 'c',
    multiple: false,
    exclusive: ['flag-value'],
    description: 'Path to a txt file with a linebreak seperated list of values to be used with the --flag-key argument',
  }),
  key: flags.string({
    char: 'f',
    multiple: false,
    required: true,
    description: "The flag we're adding to each commit",
  }),
  value: flags.string({
    char: 'v',
    multiple: false,
    description: 'The commit message argument to pass to each commit',
    exclusive: ['config-file'],
  }),
  tag: flags.boolean({
    description: 'Create a tag with this commit also',
    default: false,
  }),
  'commit-message': flags.string({
    char: 'm',
    multiple: false,
    required: true,
    description: 'The commit message prefix (used for all commits when used with --config-file)',
  }),

}

module.exports = RunCommand
