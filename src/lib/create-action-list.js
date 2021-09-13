
module.exports.createActionList = (values, flagKey, commitMessage) => {
  let output = []

  const trimmedFlagKey = flagKey.trim()
  const trimmedCommitMessage = commitMessage.trim()

  if (!trimmedFlagKey) return output
  if (!trimmedCommitMessage) return output

  values.forEach((flagValue, index) => {
    const flagConstruct = `--${trimmedFlagKey}=${flagValue}`

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
