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

exports.readListOfUrls = function(){
  var returnData = fs.readFileSync(exports.paths.list).toString();
  return returnData;
};

exports.isUrlInList = function(url){
  var fileData = exports.readListOfUrls();
  return fileData.indexOf(url) === -1 ? false : true;
};

exports.addUrlToList = function(url){
  var fileData = exports.readListOfUrls();
  var fileAdded = false;

  if (fileData.indexOf(url) === -1) {
    fs.appendFile(exports.paths.list, url, function(err) {
      if (err) console.log(err);
      else{
        fileAdded = true;
      }
    })
  }

  return fileAdded;
};

exports.isUrlArchived = function(url){
  var filesArray = fs.readdirSync(exports.paths.archivedSites)
  return filesArray.indexOf(url) === -1 ? false : true
};

exports.downloadUrls = function(){
};
