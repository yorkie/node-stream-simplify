
var simplify = require('./index');
var fs = require('fs');

simplify(fs.createReadStream('./readme.md'), function(er, data) {
  console.log(arguments)  
})