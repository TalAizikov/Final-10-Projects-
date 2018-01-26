let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let userInput;

let counter = 0;
let allWords = "";
function setup() {
  noCanvas();
  userInput = select('#userinput');
	loop = select('#loop');
	document.getElementById('button').onclick = function() {
        allWords = "";
		counter = 0;
document.getElementById("value").innerHTML = (loop.value());
   startSearch(userInput, loop);
  //goWiki(userInput.value());
};
  

  function startSearch() {
    goWiki(userInput.value(), loop.value());
  }

  function goWiki(term) {
    counter = counter + 1;
    if (counter <= loop.value()) {
      //let term = userInput.value();
      let url = searchUrl + term;
      loadJSON(url, gotSearch, 'jsonp');
    }
  }

    
  function gotSearch(data) {
    console.log(data);
    let len = data[1].length;
    let index = floor(random(len));
    let title = data[1][index];
      allWords = allWords + "<br>" + title;
    title = title.replace(/\s+/g, '_');
    
    console.log('Querying: ' + title);
    let url = contentUrl + title;
    loadJSON(url, gotContent, 'jsonp');
  }

  function gotContent(data) {
    let page = data.query.pages;
    let pageId = Object.keys(data.query.pages)[0];
    console.log(pageId);
    let content = page[pageId].revisions[0]['*'];
    console.log(content);
    let wordRegex = /\b\w{4,}\b/g;
    let words = content.match(wordRegex);
    let word = random(words);
    goWiki(word);
	   
	  document.getElementById("demo").innerHTML = (allWords);
  }
}
