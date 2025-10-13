/*!
 * parseurl
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var url = require('url')
var Url = url.Url

var URL_PATTERN =
  /^(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/

/**
 * Module exports.
 * @public
 */

module.exports = parseurl
module.exports.original = originalurl

function parseUrlString (str) {
  if (typeof str !== 'string') {
    return {}
  }

  str = str.trim()

  var match = URL_PATTERN.exec(str)
  if (!match) {
    return {}
  }

  var protocol = match[1]
  var host = match[2] || null
  var pathname = match[3] || '/'
  var search = match[4] ? '?' + match[4] : null
  var hash = match[5] ? '#' + match[5] : null

  var result = Url !== undefined ? new Url() : {}

  result.href = str
  result.path = pathname + (search || '')
  result.pathname = pathname
  result.search = search
  result.query = match[4] || null
  result.hash = hash

  if (protocol) {
    result.protocol = protocol + ':'
  }

  if (host) {
    result.host = host
    var hostParts = host.split(':')
    result.hostname = hostParts[0]
    result.port = hostParts[1] || null

    var atIndex = result.hostname.indexOf('@')
    if (atIndex !== -1) {
      result.auth = result.hostname.substring(0, atIndex)
      result.hostname = result.hostname.substring(atIndex + 1)
      result.host = result.hostname + (result.port ? ':' + result.port : '')
    }
  } else {
    result.host = null
    result.hostname = null
    result.port = null
  }

  return result
}

/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @public
 */

function parseurl (req) {
  var url = req.url

  if (url === undefined) {
    // URL is undefined
    return undefined
  }

  var parsed = req._parsedUrl

  if (fresh(url, parsed)) {
    // Return cached URL parse
    return parsed
  }

  // Parse the URL
  parsed = fastparse(url)
  parsed._raw = url

  return (req._parsedUrl = parsed)
}

/**
 * Parse the `req` original url with fallback and memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @public
 */

function originalurl (req) {
  var url = req.originalUrl

  if (typeof url !== 'string') {
    // Fallback
    return parseurl(req)
  }

  var parsed = req._parsedOriginalUrl

  if (fresh(url, parsed)) {
    // Return cached URL parse
    return parsed
  }

  // Parse the URL
  parsed = fastparse(url)
  parsed._raw = url

  return (req._parsedOriginalUrl = parsed)
}

/**
 * Parse the `str` url with fast-path short-cut.
 *
 * @param {string} str
 * @return {Object}
 * @private
 */

function fastparse (str) {
  if (typeof str !== 'string' || str.charCodeAt(0) !== 0x2f /* / */) {
    return parseUrlString(str)
  }

  var pathname = str
  var query = null
  var search = null

  // This takes the regexp from https://github.com/joyent/node/pull/7878
  // Which is /^(\/[^?#\s]*)(\?[^#\s]*)?$/
  // And unrolls it into a for loop
  for (var i = 1; i < str.length; i++) {
    switch (str.charCodeAt(i)) {
      case 0x3f /* ?  */:
        if (search === null) {
          pathname = str.substring(0, i)
          query = str.substring(i + 1)
          search = str.substring(i)
        }
        break
      case 0x09: /* \t */
      case 0x0a: /* \n */
      case 0x0c: /* \f */
      case 0x0d: /* \r */
      case 0x20: /*    */
      case 0x23: /* #  */
      case 0xa0:
      case 0xfeff:
        return parseUrlString(str)
    }
  }

  var url = Url !== undefined ? new Url() : {}

  url.path = str
  url.href = str
  url.pathname = pathname

  if (search !== null) {
    url.query = query
    url.search = search
  }

  return url
}

/**
 * Determine if parsed is still fresh for url.
 *
 * @param {string} url
 * @param {object} parsedUrl
 * @return {boolean}
 * @private
 */

function fresh (url, parsedUrl) {
  return (
    typeof parsedUrl === 'object' &&
    parsedUrl !== null &&
    (Url === undefined || parsedUrl instanceof Url) &&
    parsedUrl._raw === url
  )
}
