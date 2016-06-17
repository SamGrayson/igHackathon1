$(document).ready(function(){
  chrome.browserAction.setIcon({path: "validate-search.png"});

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
