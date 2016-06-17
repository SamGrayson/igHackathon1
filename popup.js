$(document).ready(function(){
  chrome.browserAction.setIcon({path: "validate-search.png"});

  var buildSuccessTemplate = function(data) {
    $('#viewWrapper').empty();
    $('#viewWrapper').append(
      '<div class="success-alert" id="successAlert">' +
        '<div class="icon-wrap">' +
          '<img src="success.png" class="icon" alt="" />' +
          '<span class="candidate-success">Canidate has been found!</span>' +
        '</div>' +
        '<div class="candidate-info">' +
          '<div class="info" id="candidateName">' + data["name"] + '</div>' +
          '<div class="info" id="candidateEmail">' + data["email"] + '</div>' +
          '<div class="info" id="candidateNumber">' + data["phone"] + '</div>' +
        '</div>' +
        '<div class="restrak-link">' +
          '<a href="http://restrak.dev04.dce.insightglobal.net/intranet/tracker/rmain.php?command=view&group=candidate&op=view&candidate_id=' + data["candidate_id"] + '&id=' + data["id"] + '" target="_blank" class="res-link">Add Candidate</a>' +
        '</div>' +
      '</div>'
    )
  };

  var buildErrorTemplate = function(data) {
    $('#viewWrapper').empty();
    $('#viewWrapper').append(
      '<div class="error-alert" id="errorAlert">' +
        '<div class="icon-wrap">' +
          '<img src="error.png" class="icon" alt="" />' +
          '<span class="candidate-error">Canidate not found!</span>' +
        '</div>' +
        '<div class="candidate-info">' +
          // '<div class="info" id="candidateName"></div>' +
          '<div class="info" id="candidateEmail">' + data["email"] + '</div>' +
          // '<div class="info" id="candidateNumber">123-123-1234</div>' +
        '</div>' +
        '<div class="restrak-link">' +
          '<a href="https://uat01.dce.insightglobal.net/intranet/restrak/rmain.php?command=new&group=candidate" target="_blank" class="res-link">Add Candidate</a>' +
        '</div>' +
      '</div>'
    )
  };

  var buildDefaultTemplate = function() {
    $('viewWrapper').empty();
    $('viewWrapper').append(
      '<div class="default-view" id="defaultView">' +
        '<div class="icon-wrap">' +
          '<img src="info.png" class="icon" alt="" />' +
          '<span class="default-message">No Candidate Available</span>' +
        '</div>' +
        '<div class="description">' +
          'In order to use this extension, please navigate to a profile of a candidate on LinkedIn or Career-Builder, the service will automatically run. Watch for the icon in the header to notify you of a match within ResTrak.' +
        '</div>' +
      '</div>'
    )
  }
  var reqEmail;

  if (reqEmail) {
    $.ajax({
        method: "GET",
        url: "http://dev04.dce.insightglobal.net/intranet/tracker/hack/public/",
        data: {email: reqEmail},
        crossDomain: true,
        dataType: "json"
        })
    .done(function( msg ) {
        if (msg.length > 0) {
          buildSuccessTemplate(msg[0]);
        } else {
          buildErrorTemplate(request);
        }
    }).fail(function( jqXHR, textStatus ) {
        console.log( "Request failed: " + textStatus );
        console.log(jqXHR);
    });
  }

  chrome.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
          console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
              "from the extension");

          if (request.email == "hello") {
              //sendResponse({farewell: "goodbye"});
          }

          reqEmail = request.email;
          var promise;

          //promise = $.get('https://dev04.dce.insightglobal.net/hack');
          //promise = $.get('http://ws.dev06.dce.insightglobal.net/api/1/index.php?r=jobSearch/getResults');

          $.ajax({
              method: "GET",
              url: "http://dev04.dce.insightglobal.net/intranet/tracker/hack/public/",
              data: {email: request.email},
              crossDomain: true,
              dataType: "json"
              })
          .done(function( msg ) {
              console.log(msg);
              if (msg.length > 0) {
                buildSuccessTemplate(msg[0]);
              } else {
                buildErrorTemplate(request);
              }
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
