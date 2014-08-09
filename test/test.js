
var assert = require('assert')
var parseurl = require('..')

describe('parseurl(req)', function () {
  it('should parse the requrst URL', function () {
    var req = createReq('/foo/bar')
    var url = parseurl(req)
    assert.equal(url.host, null)
    assert.equal(url.hostname, null)
    assert.equal(url.href, '/foo/bar')
    assert.equal(url.pathname, '/foo/bar')
    assert.equal(url.port, null)
    assert.equal(url.query, null)
    assert.equal(url.search, null)
  })

  it('should parse with query string', function () {
    var req = createReq('/foo/bar?fizz=buzz')
    var url = parseurl(req)
    assert.equal(url.host, null)
    assert.equal(url.hostname, null)
    assert.equal(url.href, '/foo/bar?fizz=buzz')
    assert.equal(url.pathname, '/foo/bar')
    assert.equal(url.port, null)
    assert.equal(url.query, 'fizz=buzz')
    assert.equal(url.search, '?fizz=buzz')
  })

  it('should parse a full URL', function () {
    var req = createReq('http://localhost:8888/foo/bar')
    var url = parseurl(req)
    assert.equal(url.host, 'localhost:8888')
    assert.equal(url.hostname, 'localhost')
    assert.equal(url.href, 'http://localhost:8888/foo/bar')
    assert.equal(url.pathname, '/foo/bar')
    assert.equal(url.port, '8888')
    assert.equal(url.query, null)
    assert.equal(url.search, null)
  })

  it('should not choke on auth-looking URL', function () {
    var req = createReq('//todo@txt')
    assert.equal(parseurl(req).pathname, '//todo@txt')
  })

  it('should return undefined missing url', function () {
    var req = createReq()
    var url = parseurl(req)
    assert.strictEqual(url, undefined)
  })

  describe('when using the same request', function () {
    it('should parse multiple times', function () {
      var req = createReq('/foo/bar')
      assert.equal(parseurl(req).pathname, '/foo/bar')
      assert.equal(parseurl(req).pathname, '/foo/bar')
      assert.equal(parseurl(req).pathname, '/foo/bar')
    })

    it('should reflect url changes', function () {
      var req = createReq('/foo/bar')
      var url = parseurl(req)
      var val = Math.random()

      url._token = val
      assert.equal(url._token, val)
      assert.equal(url.pathname, '/foo/bar')

      req.url = '/bar/baz'
      url = parseurl(req)
      assert.equal(url._token, undefined)
      assert.equal(parseurl(req).pathname, '/bar/baz')
    })

    it('should cache parsing', function () {
      var req = createReq('/foo/bar')
      var url = parseurl(req)
      var val = Math.random()

      url._token = val
      assert.equal(url._token, val)
      assert.equal(url.pathname, '/foo/bar')

      url = parseurl(req)
      assert.equal(url._token, val)
      assert.equal(url.pathname, '/foo/bar')
    })

    it('should cache parsing where href does not match', function () {
      var req = createReq('/foo/bar ')
      var url = parseurl(req)
      var val = Math.random()

      url._token = val
      assert.equal(url._token, val)
      assert.equal(url.pathname, '/foo/bar')

      url = parseurl(req)
      assert.equal(url._token, val)
      assert.equal(url.pathname, '/foo/bar')
    })
  })
})

function createReq(url) {
  return {
    url: url
  };
}
