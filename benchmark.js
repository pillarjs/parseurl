
'use strict';

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark')
var benchmarks = require('beautify-benchmark')
var url = require('url');
var parseurl = require('./')
var fasturl = require('fast-url-parser')
var assert = require('assert')

var simpleurl = '/foo/bar?q=123&b=c'
var simpleurlpath = '/foo/bar'
var simpleurlqs = 'q=123&b=c'
var fullurl = 'https://github.com/joyent/node/pull/7878?faster=parseurl&ok=true'
var fullurlpath = '/joyent/node/pull/7878'
var fullurlqs = 'faster=parseurl&ok=true'

// console.log(url.parse(simpleurl))
// console.log(parseurl({url: simpleurl}))
// console.log(url.parse(fullurl))
// console.log(parseurl({url: fullurl}))

var suite = new Benchmark.Suite()

suite

.add('url.parse(simpleurl)', function() {
  var parsed = url.parse(simpleurl)
  assert.equal(simpleurlpath, parsed.pathname)
  assert.equal(simpleurlqs, parsed.query)
})
.add('url.parse(fullurl)', function() {
  var parsed = url.parse(fullurl)
  assert.equal(fullurlpath, parsed.pathname)
  assert.equal(fullurlqs, parsed.query)
})
.add('fasturl.parse(simpleurl)', function() {
  var parsed = fasturl.parse(simpleurl)
  assert.equal(simpleurlpath, parsed.pathname)
  assert.equal(simpleurlqs, parsed.query)
})
.add('fasturl.parse(fullurl)', function() {
  var parsed = fasturl.parse(fullurl)
  assert.equal(fullurlpath, parsed.pathname)
  assert.equal(fullurlqs, parsed.query)
})
.add('parseurl(simpleurl)', function() {
  var parsed = parseurl({url: simpleurl})
  assert.equal(simpleurlpath, parsed.pathname)
  assert.equal(simpleurlqs, parsed.query)
})
.add('parseurl(fullurl)', function() {
  var parsed = parseurl({url: fullurl})
  assert.equal(fullurlpath, parsed.pathname)
  assert.equal(fullurlqs, parsed.query)
})

.on('cycle', function(event) {
  benchmarks.add(event.target)
})
.on('start', function(event) {
  console.log('\n  URL Parse Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date())
})
.on('complete', function done() {
  benchmarks.log()
})
.run({ 'async': false })

  // URL Parse Benchmark
  // node version: v0.11.13, date: Tue Jul 15 2014 00:00:06 GMT-0700 (PDT)
  // Starting...
  // 6 tests completed.
  //
  // url.parse(simpleurl)     x    86,274 ops/sec ±0.36% (99 runs sampled)
  // url.parse(fullurl)       x    39,205 ops/sec ±0.30% (99 runs sampled)
  // fasturl.parse(simpleurl) x 2,779,532 ops/sec ±0.51% (100 runs sampled)
  // fasturl.parse(fullurl)   x 1,276,127 ops/sec ±0.43% (101 runs sampled)
  // parseurl(simpleurl)      x 2,693,425 ops/sec ±0.19% (101 runs sampled)
  // parseurl(fullurl)        x    36,976 ops/sec ±0.68% (96 runs sampled)
