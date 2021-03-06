const {parseConfigFile} = require('../../src/lib/parse-file')
const mock = require('mock-fs')
const expect = require('chai').expect

describe('#parse-file', () => {
  it('should handle an normal file', () => {
    mock({
      './test/dir/': {
        'other.txt': 'foo\nbar\nCat\ndog',
      },
    })

    const results = parseConfigFile('./test/dir/other.txt')

    expect(results).to.have.lengthOf(4)

    mock.restore()
  })

  it('should trim whitespace correctly from entries', () => {
    mock({
      './test/dir/': {
        'whitespace.txt': 'foo   \n\n  bar  ',
      },
    })

    const results = parseConfigFile('./test/dir/whitespace.txt')

    expect(results).to.have.lengthOf(2)

    mock.restore()
  })

  it('should handle an empty file', () => {
    mock({
      './test/dir/': {
        'other.txt': '',
      },
    })

    const results = parseConfigFile('./test/dir/other.txt')

    expect(results).to.have.lengthOf(0)

    mock.restore()
  })
})
