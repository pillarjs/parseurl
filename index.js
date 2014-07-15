
/**
 * Module dependencies.
 */

var Url = require('fast-url-parser')
var parse = Url.parse

/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api public
 */

module.exports = function parseUrl(req){
  var parsed = req._parsedUrl
  var url = req.url

  if (fresh(req, parsed)) {
    return parsed
  }

  parsed = parse(url)

  if (parsed.auth && !parsed.protocol && parsed.href.indexOf('//') !== -1) {
    // This parses pathnames, and a strange pathname like //r@e should work
    parsed = parse(url.replace(/@/g, '%40'))
  }

  parsed._raw = url

  return req._parsedUrl = parsed
};

/**
 * Determine if parsed is still fresh for req.
 *
 * @param {ServerRequest} req
 * @param {object} parsedUrl
 * @return {boolean}
 * @api private
 */

function fresh(req, parsedUrl) {
  return typeof parsedUrl === 'object'
    && parsedUrl !== null
    && parsedUrl instanceof Url
    && parsedUrl._raw === req.url
}
