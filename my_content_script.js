//document.getElementById('name').innerHTML = "Tony daCosta";

$('#name').html('Anthony!!');

var googlePromise;

googlePromise = $.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyDO7iuN79IAgvymA5wdZVk8wSMh1_w2jx4&cx=017576662512468239146:omuauf_lfve&q=lectures');

googlePromise.done(function(response){
  console.log(response);
})
googlePromise.fail(function(response){
  console.log('fail', response);
})
