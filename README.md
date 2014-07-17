# parseurl

[![NPM version](https://badge.fury.io/js/parseurl.svg)](http://badge.fury.io/js/parseurl)
[![Build Status](https://travis-ci.org/expressjs/parseurl.svg?branch=master)](https://travis-ci.org/expressjs/parseurl)

Parse a URL with memoization.

## API

### var parsedUrl = parseurl(req)

`parsedUrl` is basically a `url.parse()` object.

## Benchmark

```bash
$ npm run-script bench

> parseurl@1.2.0-pre bench nodejs-parseurl
> node benchmark/index.js

> node benchmark/fullurl.js

  Parsing URL "http://localhost:8888/foo/bar?user=tj&pet=fluffy"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 1,289,858 ops/sec ±0.26% (192 runs sampled)
  nativeurl x    57,692 ops/sec ±0.30% (195 runs sampled)
  parseurl  x    56,530 ops/sec ±0.19% (195 runs sampled)

> node benchmark/pathquery.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 2,141,943 ops/sec ±0.27% (195 runs sampled)
  nativeurl x    98,455 ops/sec ±0.26% (195 runs sampled)
  parseurl  x 2,614,399 ops/sec ±0.31% (191 runs sampled)

> node benchmark/samerequest.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy" on same request object

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x  2,169,929 ops/sec ±0.25% (195 runs sampled)
  nativeurl x    100,007 ops/sec ±0.47% (196 runs sampled)
  parseurl  x 10,409,346 ops/sec ±0.63% (183 runs sampled)

> node benchmark/simplepath.js

  Parsing URL "/foo/bar"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 4,535,526 ops/sec ±0.34% (193 runs sampled)
  nativeurl x   102,778 ops/sec ±0.32% (195 runs sampled)
  parseurl  x 4,182,527 ops/sec ±0.32% (193 runs sampled)

> node benchmark/slash.js

  Parsing URL "/"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 4,830,279 ops/sec ±0.79% (191 runs sampled)
  nativeurl x   101,633 ops/sec ±0.28% (193 runs sampled)
  parseurl  x 4,306,789 ops/sec ±0.30% (191 runs sampled)
```
