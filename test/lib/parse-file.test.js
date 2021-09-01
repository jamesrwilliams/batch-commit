const {parseConfigFile} = require('../../src/lib/parse-file')
const mock = require('mock-fs')
var expect = require('chai').expect

describe('#parse-file', () => {
  it('should handle an empty file', () => {
    mock({
      './test/dir/': {
        'other.txt': 'foo\nbar\nCat\ndog',
      },
    })

    const results = parseConfigFile('./test/dir/other.txt')

    expect(results).to.have.lengthOf(4)

    mock.restore()
  })
})
