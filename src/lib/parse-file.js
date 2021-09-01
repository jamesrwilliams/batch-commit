const {readFileSync} = require('fs')

/**
 * Read the provided file path and split its lines into a trimmed array of strings
 * @param {string} filePath Path to a config file
 * @returns {string[]} Array of config values
 */
module.exports.parseConfigFile = filePath => {
  const configFile = readFileSync(filePath).toString('utf-8')
  return configFile.split('\n').map(line => line.trim())
}
