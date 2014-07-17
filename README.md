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

  fasturl   x 1,316,774 ops/sec ±0.22% (196 runs sampled)
  nativeurl x    55,180 ops/sec ±0.29% (193 runs sampled)
  parseurl  x    53,866 ops/sec ±0.35% (194 runs sampled)

> node benchmark/pathquery.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 2,142,640 ops/sec ±0.21% (195 runs sampled)
  nativeurl x    92,917 ops/sec ±0.44% (193 runs sampled)
  parseurl  x 2,694,189 ops/sec ±0.37% (195 runs sampled)

> node benchmark/samerequest.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy" on same request object

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x  2,225,370 ops/sec ±0.33% (196 runs sampled)
  nativeurl x     94,196 ops/sec ±0.34% (194 runs sampled)
  parseurl  x 10,652,758 ops/sec ±0.42% (189 runs sampled)

> node benchmark/simplepath.js

  Parsing URL "/foo/bar"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 4,514,323 ops/sec ±0.34% (192 runs sampled)
  nativeurl x   105,674 ops/sec ±0.30% (195 runs sampled)
  parseurl  x 4,247,558 ops/sec ±0.32% (195 runs sampled)

> node benchmark/slash.js

  Parsing URL "/"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 4,963,856 ops/sec ±0.43% (190 runs sampled)
  nativeurl x   105,467 ops/sec ±0.38% (196 runs sampled)
  parseurl  x 4,325,004 ops/sec ±0.33% (192 runs sampled)
```
