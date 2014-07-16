
var assert = require('assert')
var parseurl = require('..')

describe('parseurl(req)', function () {
  it('should parse the requrst URL', function () {
    var req = createReq('/foo/bar')
    var url = parseurl(req)
    assert.strictEqual(url.host, null)
    assert.strictEqual(url.hostname, null)
    assert.strictEqual(url.href, '/foo/bar')
    assert.strictEqual(url.pathname, '/foo/bar')
    assert.strictEqual(url.port, null)
  })

  it('should parse a full URL', function () {
    var req = createReq('http://localhost:8888/foo/bar')
    var url = parseurl(req)
    assert.strictEqual(url.host, 'localhost:8888')
    assert.strictEqual(url.hostname, 'localhost')
    assert.strictEqual(url.href, 'http://localhost:8888/foo/bar')
    assert.strictEqual(url.pathname, '/foo/bar')
    assert.strictEqual(url.port, '8888')
  })

  it('should not choke on auth-looking URL', function () {
    var req = createReq('//todo@txt')
    var url = parseurl(req)
    assert.ok(/^\/\/todo(?:@|%40)txt$/.test(url.pathname))
  })

  describe('when using the same request', function () {
    it('should parse multiple times', function () {
      var req = createReq('/foo/bar')
      assert.strictEqual(parseurl(req).pathname, '/foo/bar')
      assert.strictEqual(parseurl(req).pathname, '/foo/bar')
      assert.strictEqual(parseurl(req).pathname, '/foo/bar')
    })

    it('should reflect url changes', function () {
      var req = createReq('/foo/bar')
      assert.strictEqual(parseurl(req).pathname, '/foo/bar')

      req.url = '/bar/baz'
      assert.strictEqual(parseurl(req).pathname, '/bar/baz')
    })
  })
})

function createReq(url) {
  return {
    url: url
  };
}
