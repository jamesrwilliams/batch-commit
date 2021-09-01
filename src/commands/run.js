const {Command, flags} = require('@oclif/command')
const {parseConfigFile} = require('../lib/parse-file')
const {dvcs} = require('../lib/dvcs')

class RunCommand extends Command {
  async run() {
    const {flags} = this.parse(RunCommand)
    const {
      'config-file': configFilePath,
      'commit-message': commitMsg,
      prefix, brand,
    } = flags

    if (configFilePath) {
      const values = parseConfigFile(configFilePath)
      for (const value of values) {
        await dvcs(value, commitMsg)
        this.log(`Commit and tag crated for ${value}`)
      }
      this.log('Complete?')
    } else {
      this.log(`Creating empty commit for ${brand} with a tag: "${prefix}${brand}"`)
    }
  }
}

RunCommand.description = `Describe the command here
...
Extra documentation goes here
`

RunCommand.flags = {
  'config-file': flags.string({
    char: 'c',
    multiple: false,
    exclusive: ['brand'],
    description: 'Path to a txt file with a linebreak seperated list of brands',
  }),
  prefix: flags.string({
    char: 'p',
    multiple: false,
    default: '',
    description: 'Prefix used on the git tag name',
  }),
  'commit-message': flags.string({
    char: 'm',
    multiple: false,
    description: 'The commit message prefix (used for all commits when used with --config-file)',
  }),
  brand: flags.string({
    char: 'b',
    multiple: false,
    description: 'The commit message argument to pass to each commit',
    exclusive: ['config-file'],
  }),
}

module.exports = RunCommand
