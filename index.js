
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

  if (fresh(url, parsed)) {
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
 * Determine if parsed is still fresh for url.
 *
 * @param {string} url
 * @param {object} parsedUrl
 * @return {boolean}
 * @api private
 */

function fresh(url, parsedUrl) {
  return typeof parsedUrl === 'object'
    && parsedUrl !== null
    && parsedUrl instanceof Url
    && parsedUrl._raw === url
}
