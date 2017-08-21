# parseurl

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Parse a URL with memoization.

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install parseurl
```

## API

```js
var parseurl = require('parseurl')
```

### parseurl(req)

Parse the URL of the given request object (looks at the `req.url` property)
and return the result. The result is the same as `url.parse` in Node.js core.
Calling this function multiple times on the same `req` where `req.url` does
not change will return a cached parsed object, rather than parsing again.

### parseurl.original(req)

Parse the original URL of the given request object and return the result.
This works by trying to parse `req.originalUrl` if it is a string, otherwise
parses `req.url`. The result is the same as `url.parse` in Node.js core.
Calling this function multiple times on the same `req` where `req.originalUrl`
does not change will return a cached parsed object, rather than parsing again.

## Benchmark

```bash
$ npm run-script bench

> parseurl@1.3.1 bench nodejs-parseurl
> node benchmark/index.js

  http_parser@2.5.2
  node@4.4.3
  v8@4.5.103.35
  uv@1.8.0
  zlib@1.2.8
  ares@1.10.1-DEV
  icu@56.1
  modules@46
  openssl@1.0.2g

> node benchmark/fullurl.js

  Parsing URL "http://localhost:8888/foo/bar?user=tj&pet=fluffy"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 1,126,841 ops/sec ±1.87% (185 runs sampled)
  nativeurl x    86,169 ops/sec ±0.65% (187 runs sampled)
  parseurl  x    80,604 ops/sec ±1.80% (186 runs sampled)

> node benchmark/pathquery.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 1,942,484 ops/sec ±0.69% (188 runs sampled)
  nativeurl x   719,094 ops/sec ±0.93% (187 runs sampled)
  parseurl  x 2,592,042 ops/sec ±0.82% (189 runs sampled)

> node benchmark/samerequest.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy" on same request object

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x  1,917,012 ops/sec ±1.26% (187 runs sampled)
  nativeurl x    720,034 ops/sec ±0.90% (187 runs sampled)
  parseurl  x 10,788,929 ops/sec ±0.59% (187 runs sampled)

> node benchmark/simplepath.js

  Parsing URL "/foo/bar"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 5,040,171 ops/sec ±1.47% (187 runs sampled)
  nativeurl x 1,048,939 ops/sec ±1.06% (188 runs sampled)
  parseurl  x 5,071,671 ops/sec ±1.73% (184 runs sampled)

> node benchmark/slash.js

  Parsing URL "/"

  1 test completed.
  2 tests completed.
  3 tests completed.

  fasturl   x 4,113,868 ops/sec ±1.22% (187 runs sampled)
  nativeurl x   994,455 ops/sec ±2.00% (188 runs sampled)
  parseurl  x 5,732,749 ops/sec ±0.74% (189 runs sampled)
```

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/parseurl.svg
[npm-url]: https://npmjs.org/package/parseurl
[node-version-image]: https://img.shields.io/node/v/parseurl.svg
[node-version-url]: https://nodejs.org/en/download/
[travis-image]: https://img.shields.io/travis/pillarjs/parseurl/master.svg
[travis-url]: https://travis-ci.org/pillarjs/parseurl
[coveralls-image]: https://img.shields.io/coveralls/pillarjs/parseurl/master.svg
[coveralls-url]: https://coveralls.io/r/pillarjs/parseurl?branch=master
[downloads-image]: https://img.shields.io/npm/dm/parseurl.svg
[downloads-url]: https://npmjs.org/package/parseurl
