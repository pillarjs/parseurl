# parseurl

Parse a URL with memoization.

## API

### var parsedUrl = parseurl(req)

`parsedUrl` is basically a `url.parse()` object.

## Benchmark

```bash
$ npm run-script bench

> parseurl@1.1.3 bench nodejs-parseurl
> node benchmark/index.js

> node benchmark\fullurl.js

  Parsing URL "http://localhost:8888/foo/bar?user=tj&pet=fluffy"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 1,337,790 ops/sec ±0.87% (193 runs sampled)
  nativeurl x    53,146 ops/sec ±0.44% (193 runs sampled)
  parseurl  x    52,309 ops/sec ±0.44% (195 runs sampled)

> node benchmark\pathquery.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 2,137,357 ops/sec ±0.37% (194 runs sampled)
  nativeurl x    94,656 ops/sec ±0.73% (188 runs sampled)
  parseurl  x 2,442,232 ops/sec ±0.45% (194 runs sampled)

> node benchmark\samerequest.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy" on same request object

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x  2,192,408 ops/sec ±0.32% (195 runs sampled)
  nativeurl x     97,559 ops/sec ±0.73% (191 runs sampled)
  parseurl  x 10,678,247 ops/sec ±0.59% (187 runs sampled)

> node benchmark\simplepath.js

  Parsing URL "/foo/bar"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 4,540,604 ops/sec ±0.32% (191 runs sampled)
  nativeurl x   101,416 ops/sec ±0.29% (196 runs sampled)
  parseurl  x 3,999,795 ops/sec ±0.29% (193 runs sampled)

> node benchmark\slash.js

  Parsing URL "/"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 4,887,014 ops/sec ±0.48% (189 runs sampled)
  nativeurl x   105,480 ops/sec ±0.65% (195 runs sampled)
  parseurl  x 4,313,313 ops/sec ±0.28% (193 runs sampled)
```
