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
