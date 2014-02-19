# node-stream-simplify

Little utility for simplifying your stream, programming more like callback style.

Sometimes, you just wanna send a simple net data to the service, then you provide a callback that receive the data. This module could help you to do then.

The difference is more like the `fs.read` and `fs.createReadStream`, so you could use my module to monitor `fs.read` by using `fs.createReadStream`, actually `stream-simplify` should be used for streams that only provide an event-drivern api, like `net` or `tls`.

### Installation
```
$ npm install stream-simplify
```

### Example
```js
simplify(fs.createReadStream('./example.txt'), option, function(err, data) {
  // TODO
})
```

### Option

* timeout: the max secound that callback must be invoked.

* depth: the time that you wanna triggered the `data`event.

### License

MIT
