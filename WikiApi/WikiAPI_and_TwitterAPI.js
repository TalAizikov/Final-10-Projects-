let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
let userInput;
let tweetTxt;
let tweetTxtN;
let keyWord;
console.log('we up NIBBA');

function setup(){

/*  console.log('passed into setup');
  noCanvas();
  userInput = select('#userinput');
  userInput.changed(goWiki);
  goWiki();*/ //Only for hmtl box streach, not for twitter bot integration
}

  searchT();

function main() {
  console.log('you made it to main');
  function goWiki(){
    let term = keyWord;//userInput.value();
    let url = searchUrl + term;
    console.log(url);
    loadJSON(url, gotSearch, 'jsonp');

  }
  goWiki();

  function gotSearch(data){
    let len = data[1].length;
    let index = floor(random(len));
    let title = data[1][index];
    title = title.replace(/\s+/g, '_' );
    console.log('Where is de wey '+ title);
    let url = contentUrl + title;
    loadJSON(url, gotContent, 'jsonp');
  }
  function gotContent(data){
    let page = data.query.pages;
    let pageId = Object.keys(data.query.pages)[0];
    let content = page[pageId].revisions[0]['*'];
    console.log(content);
  }
}


function searchT(){
  console.log('the bot is starting');
  var Twit = require('twit');
  var config = require('./config');
  var T = new Twit(config);

  var stream = T.stream('statuses/filter', { track: 'fuck' });
  console.log('passes require');

  stream.on('tweet', function (tweet) {
       tweetTxtN = tweet.text.length;
       console.log(tweet);
        tweetTxt = tweet.text.split(" ");

  //    console.log(tweetTxt);
      console.log('stream has activated');
       postid = tweet.id_str;
     if(tweet.id>10){
       stream.stop();
         wordFind();
       }
  });
}

function wordFind(){

  function randN(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

    let quickMaths = randN(0, tweetTxt.length);
    keyWord = tweetTxt[quickMaths];
/*      for (var i in tweetTxt) {
        console.log(tweetTxt[i]);
      }
      console.log(tweetTxt.length);*/
      console.log(keyWord);
      console.log('should see a word ^');
      main();
}
console.log('bottom reached');
