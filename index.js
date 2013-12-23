
var stream = require('stream');
var DEPTH = 0;
var TIMEOUT = 1000;

function lastArgument(args) {
  return Array.prototype.slice.call(args, -1)[0];
}

function simplify(obj, option, callback) {

  if (typeof lastArgument(arguments) !== 'function')
    throw new Error('callback required');
  
  if (!(obj instanceof stream.Readable))
    callback(new Error('First arguments should be a stream.Readable'));

  if (arguments.length === 2) {
    callback = option;
    option = {};
  };

  var current = 0;
  var buffers = [];
  var timer;

  var depth = option.depth || DEPTH;
  var timeout = option.timeout || TIMEOUT;

  obj.on('data', onData.bind(obj));
  obj.once('error', onError.bind(obj));

  timer = setTimeout(function() {
    clean();
    callback(null, Buffer.concat(buffers));
  },timeout);

  function clean() {
    obj.removeListener('data', onData);
    obj.removeListener('error', onError);
  }

  function onData(chunk) {
    buffers.push(chunk);
    if (current++ >= depth) {
      clearTimeout(timer);
      return callback(null, Buffer.concat(buffers));
    }
  }

  function onError(er) {
    clearTimeout(timer);
    clean();
    callback(er);
  }
}

module.exports = simplify;
