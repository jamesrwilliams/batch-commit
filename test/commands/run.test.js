const {expect, test} = require('@oclif/test')

describe('CMD run', () => {
  test
  .stdout()
  .command(['run', '--flagKey'])
  .catch(error => expect(error.message).to.match(/Unexpected argument: --flagKey/))
  .it('With no flags')

  test
  .stdout()
  .command(['run', '--key', 'foo'])
  .catch(error => expect(error.message).to.match(/Missing required flag:\n -m, --commit-message COMMIT-MESSAGE/))
  .it('With some flags')

  // eslint-disable-next-line no-warning-comments
  // TODO Work out a way to test the commander.js interactive confirm.
  // test
  //   .stdout()
  //   .command(['run', '--key', 'foo', '--commit-message', 'foo'])
  //   .catch(error => expect(error.message).to.match(/command run --flagKey= not found/))
  //   .it('happy path')
})

