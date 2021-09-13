const {createActionList} = require('../../src/lib/create-action-list')
const expect = require('chai').expect

describe('#create-action-list', () => {
  it('should handle an empty values list', function () {
    const response = createActionList([], 'foo', 'bar')

    expect(response).to.have.lengthOf(0)
  })

  it('should handle a single values list', () => {
    const response = createActionList(['cat'], 'foo', 'bar')

    expect(response).to.have.lengthOf(1)
    expect(response).to.deep.eq([
      {
        index: 1,
        key: 'cat',
        message: 'bar --foo=cat',
        tagName: 'bar_cat',
        tagMessage: '--foo=cat',
      },
    ])
  })

  it('should return nothing for a falsy flagKey value', function () {
    const falsyValues = ['', '  ']

    falsyValues.forEach(value => {
      const response = createActionList(['cat'], value, 'bar')
      expect(response).to.have.lengthOf(0)
    })
  })

  it('should handle an empty commit message', () => {
    const falsyValues = ['', '  ']

    falsyValues.forEach(value => {
      const response = createActionList(['cat'], 'foo', value)
      expect(response).to.have.lengthOf(0)
    })
  })
})
