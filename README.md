# parseurl

Parse a URL with memoization.

## API

### var parsedUrl = parseurl(req)

`parsedUrl` is basically a `url.parse()` object.

## Benchmark

```bash
$ node benchmark.js


  URL Parse Benchmark
  node version: v0.11.13, date: Tue Jul 15 2014 00:00:06 GMT-0700 (PDT)
  Starting...
  6 tests completed.

  url.parse(simpleurl)     x    86,274 ops/sec ±0.36% (99 runs sampled)
  url.parse(fullurl)       x    39,205 ops/sec ±0.30% (99 runs sampled)
  fasturl.parse(simpleurl) x 2,779,532 ops/sec ±0.51% (100 runs sampled)
  fasturl.parse(fullurl)   x 1,276,127 ops/sec ±0.43% (101 runs sampled)
  parseurl(simpleurl)      x 2,693,425 ops/sec ±0.19% (101 runs sampled)
  parseurl(fullurl)        x    36,976 ops/sec ±0.68% (96 runs sampled)

```
