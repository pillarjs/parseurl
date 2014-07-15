
'use strict';

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark')
var benchmarks = require('beautify-benchmark')
var url = require('url');
var parseurl = require('./')
var fasturl = require('fast-url-parser')

var simpleurl = '/foo/bar?q=123&b=c'
var fullurl = 'https://github.com/joyent/node/pull/7878?faster=parseurl&ok=true'

// console.log(url.parse(simpleurl))
// console.log(parseurl({url: simpleurl}))
// console.log(url.parse(fullurl))
// console.log(parseurl({url: fullurl}))

var suite = new Benchmark.Suite()

suite

.add('url.parse(simpleurl)', function() {
  url.parse(simpleurl)
})
.add('url.parse(fullurl)', function() {
  url.parse(fullurl)
})
.add('fasturl.parse(simpleurl)', function() {
  fasturl.parse(simpleurl)
})
.add('fasturl.parse(fullurl)', function() {
  fasturl.parse(fullurl)
})
.add('parseurl(simpleurl)', function() {
  parseurl({url: simpleurl})
})
.add('parseurl(fullurl)', function() {
  parseurl({url: fullurl})
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
// node version: v0.11.12, date: Tue Jul 15 2014 13:46:25 GMT+0800 (CST)
// Starting...
// 4 tests completed.
//
// url.parse(simpleurl) x   104,647 ops/sec ±1.47% (96 runs sampled)
// url.parse(fullurl)   x    57,793 ops/sec ±2.19% (92 runs sampled)
// parseurl(simpleurl)  x 2,490,911 ops/sec ±1.24% (93 runs sampled)
// parseurl(fullurl)    x    57,401 ops/sec ±2.02% (95 runs sampled)
