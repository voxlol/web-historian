var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// ask adam about http-get



exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  var readStream = fs.createReadStream(asset);
  readStream.on('open', function(){ readStream.pipe(res) });
  // fs.readFile(asset, function(err,data){
  //   res.end(data.toString());
  // })
};



// As you progress, keep thinking about what helper functions you can put here!
