# parseurl

Parse a URL with memoization.

## API

### var parsedUrl = parseurl(req)

`parsedUrl` is basically a `url.parse()` object.

## Benchmark

```bash
$ node benchmark.js


  URL Parse Benchmark
  node version: v0.11.12, date: Tue Jul 15 2014 13:46:25 GMT+0800 (CST)
  Starting...
  4 tests completed.

  url.parse(simpleurl) x   104,647 ops/sec ±1.47% (96 runs sampled)
  url.parse(fullurl)   x    57,793 ops/sec ±2.19% (92 runs sampled)
  parseurl(simpleurl)  x 2,490,911 ops/sec ±1.24% (93 runs sampled)
  parseurl(fullurl)    x    57,401 ops/sec ±2.02% (95 runs sampled)
```

## LICENSE

(The MIT License)

Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
