'use strict'

//handle the submit button
function handleSubmit() {
  console.log('1');
  $('#input-form').submit(event => {
  event.preventDefault();
   const searchWordTarget = $(event.currentTarget).find('#searchfield');
   const searchWord = searchWordTarget.val();
   searchWordTarget.val("");
   callYoutube(searchWord, displayYoutubeData);
  });
}

// call youtube api
function callYoutube(searchWord, callBack) {
  console.log('2');
const params = {
    part:'snippet',
    key:'AIzaSyAZLWhzTxFLcoVfQ39tIOjzGoTnbyBTt_k',
    q: searchWord,
    maxResults: 5,
    type: 'video',
    order: 'relevance',
  };
  const url = 'https://www.googleapis.com/youtube/v3/search';
  $.getJSON(url, params, callBack)
  callUrbanDictionary(searchWord);
}

// display youtube results
function displayYoutube(searchWord) {
  console.log('4');
return `
  <div>
	  <h2>
		<a class="js-result-name" href="https://www.youtube.com/watch?v=${searchWord.id.videoId}" target="_blank">${searchWord.snippet.title}</a> 
		</h2>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${searchWord.id.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
	</div>
  `;
}

// display the youtube data
function displayYoutubeData(data) {
  console.log('3');
  let results = data.items.map((item, index) => 
  displayYoutube(item));
  $('.youtube').html(results);
}


//call urban dictionary api
function callUrbanDictionary(searchWord) {
	const url  = `https://api.urbandictionary.com/v0/define?term=${searchWord}`;
$.getJSON(url, function(data) {
	console.log(data.list);
	displayUrbanDictionaryData(data);
	callGiphy(searchWord);
});
}

//display urban dictionary results
function displayUrbanDictionaryData(results) {
	$('.urbanDictionary').html(`
		<h1>${results.list[0].word}</h1>
		<p>${results.list[0].definition}</p>
		<p>${results.list[0].example}</p>
		`);
}

//call giphy api
function callGiphy(searchWord) {
	const url = 'https://api.giphy.com/v1/gifs/search';
	let settings = {
		q: searchWord,
		limit: 5,
		api_key: 'Jbn01K3ZtgB3K2sdBvlzAkqAAFfPWtO6',
	};
	$.getJSON(url, settings, function(data) {
		console.log(data.data);
	displayGiphy(data.data);
	});
}

//display giphy results
function displayGiphy(results) {
	let buildOutput = '';

	$.each(results, function(key, value) {
		buildOutput += '<div>';
		buildOutput += '<img src = ' + value.images.downsized_medium.url + '>';
		buildOutput += '<div>'
	});
	$('.giphy').html(buildOutput);
}
$(handleSubmit);