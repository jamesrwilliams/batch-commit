const simpleGit = require('simple-git')

const git = simpleGit()

/**
 * Lets interact with Git - via node!
 * @param {string} commitMessage The commit message used for all the commits
 * @param {string} tagName The tag name passed to git
 * @param {string} tagMessage The tag message for creating a git tag
 * @param {object} options Options object
 * @returns {Promise<unknown>} The status of this VCS action
 */
module.exports.dvcs = async (commitMessage, tagName, tagMessage, options) => {
  const defaultOptions = {
    tagEnabled: false,
    pushEnabled: false,
  }

  const {tagEnabled, pushEnabled} = {...defaultOptions, ...options}

  await git.status()
  await later(2000) // Artificial delay
  const commit = await git.commit(commitMessage, {'--allow-empty': null})
  const commitHash = await git.revparse(commit.commit)

  if (tagEnabled) {
    await git.addAnnotatedTag(tagName, tagMessage)
  }

  if (pushEnabled) {
    await git.push(['--follow-tags'])
  }

  return commitHash
}

function later(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay)
  })
}

module.exports.test = async () => {
  return git.status()
}

module.exports.currentRepo = async () => {
  return git.listRemote(['--get-url']).then(remoteURL => {
    return remoteURL.split(':')[1].split('.git')[0]
  })
}
