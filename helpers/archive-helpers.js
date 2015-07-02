var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, function(err, data){
    err ? console.log(err) : cb(data.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, cb){
  fs.readFile(exports.paths.list, function(err, data){
    if(err) console.log(err);
    else{
      data.toString().split('\n').indexOf(url) === -1 ? cb(false) : cb(true);
    }
  });
};

exports.addUrlToList = function(url, cb){
  // grab the list and have access to it
  fs.readFile(exports.paths.list, function(err, data){
    if(err) console.log(err);
    else{
    // check the list for the url and run the cb
      if (data.toString().split('\n').indexOf(url) === -1){
        fs.appendFile(exports.paths.list, url, function(err) {
          err ? cb(false) : cb(true)
        })
      }
    }
  })
};

exports.isUrlArchived = function(url, cb){
  fs.readdir(exports.paths.archivedSites, function(err, data){
    // console.log(data.toString().split(','));
    // console.log('url : ' + url);
    // console.log('indexOf : ' + data.toString().split(',').indexOf(url))
    err ? console.log(err) :
      (data.toString().split(',').indexOf(url) === -1) ? cb(false) : cb(true);
  });
};

exports.downloadUrls = function(urlArray){
  // AJAX GET request to pull html from 'url' server
    //save HTML to /sites/
};
