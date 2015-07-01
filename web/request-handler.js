var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var actions = {
  'GET': function(req, res){
    console.log('Serving GET request to '+req.url)
    res.writeHead(200, httpHelpers.headers)
    if(req.url === '/'){
      var asset = archive.paths.siteAssets + '/index.html';
      httpHelpers.serveAssets(res, asset)
    }else{
      var url = req.url.slice(1);

      archive.isUrlInList(url, function(isInList){
        console.log('isInList : ' + isInList);
        if(isInList){
          // in the list
          archive.isUrlArchived(url, function(isInArchive){
            console.log('isInArchive : ' + isInArchive);
            if(isInArchive){
              // in archive
              var asset = archive.paths.archivedSites + req.url;
              httpHelpers.serveAssets(res, asset);
            }else{
              // not in the archive
              var asset = archive.paths.siteAssets + '/loading.html';
              httpHelpers.serveAssets(res, asset);
            }
          });
        }else{
          // not in the list
          // route to 404
        }
      })
    }
  },
  'POST': function(req, res){
    res.writeHead(200, httpHelpers.headers)
    res.end("Good to go.")
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
