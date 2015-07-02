// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var helpers = require('../helpers/archive-helpers.js');
var crontab = require('node-crontab');


var jobId = crontab.scheduleJob("*/1 * * * *", function(){
  // Read the list of urls to be archived
    //if a url is not yet archived, add it to an array
    //At the end of the list, pass the array of to-be-archived urls into helpers.downloadUrls
  helpers.readListOfUrls(function(urlList){
    var notArchived = [];
    var counter = 0;
    // iterate through all the url's
    urlList.forEach(function(url, i){
      // check if the url is archived
      helpers.isUrlArchived(url, function(isArchived){
        counter++;
        // if not archived, push it to the notArchived array
        if(!isArchived){
          notArchived.push(url);
        }
        // send to download URLs once the isUrlArchived cb has run on every list in the urlList.
        if(counter === urlList.length){
          console.log("List complete, sites not archived: " + notArchived)
          helpers.downloadUrls(notArchived);
        }
      })
    })
  });
});


