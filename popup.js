$(document).ready(function(){
  // Called when the user clicks on the browser action.
  chrome.browserAction.onClicked.addListener(function(tab) {
      // No tabs or host permissions needed!
      console.log('Turning ' + tab.url + ' red!');
      chrome.tabs.executeScript({
          code: 'document.body.style.backgroundColor="red"'
      });
  });

  chrome.browserAction.onClicked.addListener(function (tab) {
      // No tabs or host permissions needed!


      chrome.tabs.executeScript({
          code: 'console.log("bang!")'
      });
  });

  chrome.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
          console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
              "from the extension");

          if (request.email == "hello") {
              //sendResponse({farewell: "goodbye"});
          }

          var promise;

          //promise = $.get('https://dev04.dce.insightglobal.net/hack');
          //promise = $.get('http://ws.dev06.dce.insightglobal.net/api/1/index.php?r=jobSearch/getResults');

          $.ajax({
              method: "GET",
              url: "http://dev04.dce.insightglobal.net/intranet/tracker/hack/public/",
              data: {email: 'bclaroni@gmail.com', time: new Date()},
              crossDomain: true
              })
          .done(function( msg ) {
              console.log("Data Saved: " + msg );
          }).fail(function( jqXHR, textStatus ) {
              console.log( "Request failed: " + textStatus );
              console.log(jqXHR);
          });

          //promise.done(function(response){
          //    console.log(response);
          //})
          //promise.fail(function(response){
          //    console.log('fail', response);
          //})

      });  
});
