
/**
 * Module dependencies.
 */

var url = require('url')
var parse = url.parse
var Url = url.Url

/**
 * Pattern for a simple path case.
 * See: https://github.com/joyent/node/pull/7878
 */

var simplePathRegExp = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
var tryFastRegExp = /^\/[^\\#]*$/

/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api public
 */

module.exports = function parseUrl(req){
  var parsed = req._parsedUrl

  if (parsed instanceof Url && parsed.href === req.url) {
    return parsed
  }

  parsed = fastparse(req.url)

  if (parsed.auth && !parsed.protocol && parsed.href.indexOf('//') !== -1) {
    // This parses pathnames, and a strange pathname like //r@e should work
    parsed = fastparse(req.url.replace(/@/g, '%40'))
  }

  return req._parsedUrl = parsed
};

/**
 * Parse the `str` url with fast-path short-cut.
 *
 * @param {string} str
 * @return {Object}
 * @api private
 */

function fastparse(str) {
  if (typeof str === 'string' && tryFastRegExp.test(str)) {
    // Try fast path regexp
    // See: https://github.com/joyent/node/pull/7878
    var simplePath = simplePathRegExp.exec(str)

    // Construct simple URL
    if (simplePath) {
      var url = new Url()
      url.path = str
      url.href = str
      url.pathname = simplePath[1]

      if (simplePath[2]) {
        url.search = simplePath[2];
        url.query = url.search.substr(1);
      }

      return url
    }
  }

  return parse(str)
}
