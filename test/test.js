
var assert = require('assert')
var parseurl = require('..')
var url = require('url')

var URL_EMPTY_VALUE = url.Url
  ? null : undefined

describe('parseurl(req)', function () {
  it('should parse the request URL', function () {
    var req = createReq('/foo/bar')
    var url = parseurl(req)
    assert.strictEqual(url.host, URL_EMPTY_VALUE)
    assert.strictEqual(url.hostname, URL_EMPTY_VALUE)
    assert.strictEqual(url.href, '/foo/bar')
    assert.strictEqual(url.pathname, '/foo/bar')
    assert.strictEqual(url.port, URL_EMPTY_VALUE)
    assert.strictEqual(url.query, URL_EMPTY_VALUE)
    assert.strictEqual(url.search, URL_EMPTY_VALUE)
  })

  it('should parse with query string', function () {
    var req = createReq('/foo/bar?fizz=buzz')
    var url = parseurl(req)
    assert.strictEqual(url.host, URL_EMPTY_VALUE)
    assert.strictEqual(url.hostname, URL_EMPTY_VALUE)
    assert.strictEqual(url.href, '/foo/bar?fizz=buzz')
    assert.strictEqual(url.pathname, '/foo/bar')
    assert.strictEqual(url.port, URL_EMPTY_VALUE)
    assert.strictEqual(url.query, 'fizz=buzz')
    assert.strictEqual(url.search, '?fizz=buzz')
  })

  it('should parse a full URL', function () {
    var req = createReq('http://localhost:8888/foo/bar')
    var url = parseurl(req)
    assert.strictEqual(url.host, 'localhost:8888')
    assert.strictEqual(url.hostname, 'localhost')
    assert.strictEqual(url.href, 'http://localhost:8888/foo/bar')
    assert.strictEqual(url.pathname, '/foo/bar')
    assert.strictEqual(url.port, '8888')
    assert.strictEqual(url.query, URL_EMPTY_VALUE)
    assert.strictEqual(url.search, URL_EMPTY_VALUE)
  })

  it('should not choke on auth-looking URL', function () {
    var req = createReq('//todo@txt')
    assert.strictEqual(parseurl(req).pathname, '//todo@txt')
  })

  it('should return undefined missing url', function () {
    var req = createReq()
    var url = parseurl(req)
    assert.strictEqual(url, undefined)
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
      var url = parseurl(req)
      var val = Math.random()

      url._token = val
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')

      req.url = '/bar/baz'
      url = parseurl(req)
      assert.strictEqual(url._token, undefined)
      assert.strictEqual(parseurl(req).pathname, '/bar/baz')
    })

    it('should cache parsing', function () {
      var req = createReq('/foo/bar')
      var url = parseurl(req)
      var val = Math.random()

      url._token = val
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')

      url = parseurl(req)
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')
    })

    it('should cache parsing where href does not match', function () {
      var req = createReq('/foo/bar ')
      var url = parseurl(req)
      var val = Math.random()

      url._token = val
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')

      url = parseurl(req)
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')
    })
  })
})

describe('parseurl.original(req)', function () {
  it('should parse the request original URL', function () {
    var req = createReq('/foo/bar', '/foo/bar')
    var url = parseurl.original(req)
    assert.strictEqual(url.host, URL_EMPTY_VALUE)
    assert.strictEqual(url.hostname, URL_EMPTY_VALUE)
    assert.strictEqual(url.href, '/foo/bar')
    assert.strictEqual(url.pathname, '/foo/bar')
    assert.strictEqual(url.port, URL_EMPTY_VALUE)
    assert.strictEqual(url.query, URL_EMPTY_VALUE)
    assert.strictEqual(url.search, URL_EMPTY_VALUE)
  })

  it('should parse originalUrl when different', function () {
    var req = createReq('/bar', '/foo/bar')
    var url = parseurl.original(req)
    assert.strictEqual(url.host, URL_EMPTY_VALUE)
    assert.strictEqual(url.hostname, URL_EMPTY_VALUE)
    assert.strictEqual(url.href, '/foo/bar')
    assert.strictEqual(url.pathname, '/foo/bar')
    assert.strictEqual(url.port, URL_EMPTY_VALUE)
    assert.strictEqual(url.query, URL_EMPTY_VALUE)
    assert.strictEqual(url.search, URL_EMPTY_VALUE)
  })

  it('should parse req.url when originalUrl missing', function () {
    var req = createReq('/foo/bar')
    var url = parseurl.original(req)
    assert.strictEqual(url.host, URL_EMPTY_VALUE)
    assert.strictEqual(url.hostname, URL_EMPTY_VALUE)
    assert.strictEqual(url.href, '/foo/bar')
    assert.strictEqual(url.pathname, '/foo/bar')
    assert.strictEqual(url.port, URL_EMPTY_VALUE)
    assert.strictEqual(url.query, URL_EMPTY_VALUE)
    assert.strictEqual(url.search, URL_EMPTY_VALUE)
  })

  it('should return undefined missing req.url and originalUrl', function () {
    var req = createReq()
    var url = parseurl.original(req)
    assert.strictEqual(url, undefined)
  })

  describe('when using the same request', function () {
    it('should parse multiple times', function () {
      var req = createReq('/foo/bar', '/foo/bar')
      assert.strictEqual(parseurl.original(req).pathname, '/foo/bar')
      assert.strictEqual(parseurl.original(req).pathname, '/foo/bar')
      assert.strictEqual(parseurl.original(req).pathname, '/foo/bar')
    })

    it('should reflect changes', function () {
      var req = createReq('/foo/bar', '/foo/bar')
      var url = parseurl.original(req)
      var val = Math.random()

      url._token = val
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')

      req.originalUrl = '/bar/baz'
      url = parseurl.original(req)
      assert.strictEqual(url._token, undefined)
      assert.strictEqual(parseurl.original(req).pathname, '/bar/baz')
    })

    it('should cache parsing', function () {
      var req = createReq('/foo/bar', '/foo/bar')
      var url = parseurl.original(req)
      var val = Math.random()

      url._token = val
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')

      url = parseurl.original(req)
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')
    })

    it('should cache parsing if req.url changes', function () {
      var req = createReq('/foo/bar', '/foo/bar')
      var url = parseurl.original(req)
      var val = Math.random()

      url._token = val
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')

      req.url = '/baz'
      url = parseurl.original(req)
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')
    })

    it('should cache parsing where href does not match', function () {
      var req = createReq('/foo/bar ', '/foo/bar ')
      var url = parseurl.original(req)
      var val = Math.random()

      url._token = val
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')

      url = parseurl.original(req)
      assert.strictEqual(url._token, val)
      assert.strictEqual(url.pathname, '/foo/bar')
    })
  })
})

function createReq (url, originalUrl) {
  return {
    originalUrl: originalUrl,
    url: url
  }
}
