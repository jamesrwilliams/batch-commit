const simpleGit = require('simple-git')
const git = simpleGit()

/**
 * Lets interact with Git - via node!
 * @param {string} brand The brand we're using in the commit message
 * @param {string} message The tag name we're using
 * @returns {Promise<unknown>} The status of this VCS action
 */
module.exports.dvcs = async (brand, message) => {

  const commitMessage = `${message} --prefix=${brand}`
  const tagName = `${message}_${brand}`
  const tagMessage = `--prefix=${brand}`

  const status = await git.status()
  // await later(2000)
  const commit = await git.commit(commitMessage, {'--allow-empty': null})
  const tag = await git.addAnnotatedTag(tagName, tagMessage)

  // Create empty commit
  return {status, commit, tag}
}

function later(delay) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay)
  })
}
