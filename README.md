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

  http_parser@2.7.0
  node@4.8.4
  v8@4.5.103.47
  uv@1.9.1
  zlib@1.2.11
  ares@1.10.1-DEV
  icu@56.1
  modules@46
  openssl@1.0.2k

> node benchmark/fullurl.js

  Parsing URL "http://localhost:8888/foo/bar?user=tj&pet=fluffy"

  3 tests completed.

  fasturl   x 1,283,955 ops/sec ±0.58% (188 runs sampled)
  nativeurl x    86,909 ops/sec ±0.94% (186 runs sampled)
  parseurl  x    86,819 ops/sec ±0.51% (189 runs sampled)

> node benchmark/pathquery.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy"

  3 tests completed.

  fasturl   x 1,997,268 ops/sec ±0.48% (188 runs sampled)
  nativeurl x   669,553 ops/sec ±0.65% (188 runs sampled)
  parseurl  x 2,732,084 ops/sec ±0.96% (187 runs sampled)

> node benchmark/samerequest.js

  Parsing URL "/foo/bar?user=tj&pet=fluffy" on same request object

  3 tests completed.

  fasturl   x  2,152,978 ops/sec ±0.66% (188 runs sampled)
  nativeurl x    708,335 ops/sec ±0.80% (189 runs sampled)
  parseurl  x 11,490,082 ops/sec ±1.06% (189 runs sampled)

> node benchmark/simplepath.js

  Parsing URL "/foo/bar"

  3 tests completed.

  fasturl   x 5,430,961 ops/sec ±0.57% (189 runs sampled)
  nativeurl x   931,075 ops/sec ±0.51% (189 runs sampled)
  parseurl  x 5,176,706 ops/sec ±1.22% (188 runs sampled)

> node benchmark/slash.js

  Parsing URL "/"

  3 tests completed.

  fasturl   x 4,069,891 ops/sec ±0.89% (186 runs sampled)
  nativeurl x   920,859 ops/sec ±0.67% (188 runs sampled)
  parseurl  x 5,747,987 ops/sec ±0.57% (188 runs sampled)
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
