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

          console.log("foobar");
          $('#scrape').html('Boo yeah!');

          if (request.email == "hello") {
              //sendResponse({farewell: "goodbye"});

          }

      });  
})
