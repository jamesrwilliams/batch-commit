
module.exports.createActionList = (values, flagKey, commitMessage) => {
  let output = []

  values.forEach((flagValue, index) => {
    const flagConstruct = `--${flagKey}=${flagValue}`

    const filteredCommitMessage = commitMessage.toLowerCase().replace(/ /g, '-')

    output.push({
      index: index + 1,
      key: flagValue,
      message: `${commitMessage} ${flagConstruct}`,
      tagName: `${filteredCommitMessage}_${flagValue}`,
      tagMessage: flagConstruct,
    })
  })

  return output
}
