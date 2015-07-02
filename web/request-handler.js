var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');

var actions = {
  'GET': function(req, res){
    console.log('Serving GET request to '+req.url)
    res.writeHead(200, httpHelpers.headers)
    if(req.url === '/'){
      var asset = archive.paths.siteAssets + '/index.html';
      httpHelpers.serveAssets(res, asset)
    }else{
      var url = req.url.slice(1);
      archive.isUrlArchived(url, function(isInArchive){
        if(isInArchive){
          var asset = archive.paths.archivedSites + req.url;
          httpHelpers.serveAssets(res, asset);
        }else{
          res.writeHead(404, httpHelpers.headers)
          res.end("Not Found.")
        }
      });
    }
  },
  'POST': function(req, res){
    var contents = ""
    req.addListener('data', function(chunk) {
      contents += chunk;
    });

    req.addListener('end', function(err){
      contents = contents.toString();
      var url = contents.slice(4);
      console.log(url);

      archive.isUrlInList(url, function(isInList){
        if(isInList){
          res.writeHead(302, httpHelpers.headers)
          res.end('Already in sites.txt');
        }else{
          fs.appendFile(archive.paths.list, url.toString()+'\n', function(err){
            if(err){
              res.writeHead(500, httpHelpers.headers)
              res.end('Append error');
            }else{
              res.writeHead(302, httpHelpers.headers);
              res.end(url + " appended.");
            }
          });
        }
      });
    })

  },
  'OPTIONS': function(req, res){
    res.writeHead(200, httpHelpers.headers)
    res.end("Good to go.")
  }
}

exports.handleRequest = function (req, res) {
  var action = req.method;
  if (actions[action]) {
    actions[action](req,res);
  } else {
    res.writeHead(404, httpHelpers.headers)
    res.end("Not Found.")
  }
};
