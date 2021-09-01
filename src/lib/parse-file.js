const {readFileSync} = require('fs')

/**
 * Read the provided file path and split its lines into a trimmed array of strings
 * @param {string} filePath Path to a config file
 * @returns {string[]} Array of config values
 */
module.exports.parseConfigFile = filePath => {
  const configFile = readFileSync(filePath).toString('utf-8')
  const filtered = configFile.split('\n').map(line => {
    const trimmed = line.trim()
    return (trimmed ? trimmed : null)
  })
  return filtered.filter(x => Boolean(x))
}
