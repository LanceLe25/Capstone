'use strict'

//handle the submit button
function handleSubmit() {
  console.log('1');
  $('#input-form').submit(event => {
  event.preventDefault();
   const searchWordTarget = $(event.currentTarget).find('#searchfield');
   const searchWord = searchWordTarget.val();
   searchWordTarget.val("");
   console.log(searchWord);
     if (searchWord == '') {
  	$('main').html(`
  		<div class = 'empty'>
  		<h1>Whoops!</h1>
  		<p>Please add a search keyword</p>
  		</div>
  		`);
  }
  else{
  	callYoutube(searchWord, displayYoutubeData);
  	callUrbanDictionary(searchWord);
  	callGiphy(searchWord);
  }
  });
}

// call youtube api
function callYoutube(searchWord, callBack) {
  console.log('2');
const params = {
    part:'snippet',
    key:'AIzaSyAZLWhzTxFLcoVfQ39tIOjzGoTnbyBTt_k',
    q: searchWord,
    maxResults: 3,
    type: 'video',
    order: 'relevance',
  };
  const url = 'https://www.googleapis.com/youtube/v3/search';
  $.getJSON(url, params, callBack);
}

// display youtube results
function displayYoutube(searchWord) {
  console.log('4');
return `
  <div class="youtube_frame">
	  <h2>
		<a class="youtube_name" href="https://www.youtube.com/watch?v=${searchWord.id.videoId}" target="_blank">${searchWord.snippet.title}</a> 
		</h2>
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/${searchWord.id.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen alt="youtube video for search word"></iframe>'
	</div>
  `;
}

// display the youtube data
function displayYoutubeData(data) {
  console.log('3');
  let results = data.items.map((item, index) => 
  displayYoutube(item));
  console.log(data);
  $('.youtube').html(results);
}


//call urban dictionary api
function callUrbanDictionary(searchWord) {
	const url  = `https://api.urbandictionary.com/v0/define?term=${searchWord}`;
$.getJSON(url, function(data) {
	console.log(data.list);
	displayUrbanDictionaryData(data);
});
}

//display urban dictionary results
function displayUrbanDictionaryData(results) {
	let urbanWord = results.list[0];
	if(urbanWord == null) {
		$('.urbanDictionary').html(`
			<div class = 'error_urban_dictionary'>
  		<h1>Whoops!</h1>
  		<p>No definition found</p>
  		</div>
			`);
	}
	else {
	$('.urbanDictionary').html(`
		<div class ="urbanWordWrap">
		<h1>${urbanWord.word}</h1>
		<p>Definition: ${urbanWord.definition}</p>
		<p>Example: ${urbanWord.example}</p>
		</div>
		`);
	}
}

//call giphy api
function callGiphy(searchWord) {
	const url = 'https://api.giphy.com/v1/gifs/search';
	let settings = {
		q: searchWord,
		limit: 3,
		api_key: 'Jbn01K3ZtgB3K2sdBvlzAkqAAFfPWtO6',
	};
	$.getJSON(url, settings, function(data) {
		console.log(data);
	displayGiphy(data.data);
	});
}

//display giphy results
function displayGiphy(results) {
	if(results == null | results == "" | results == undefined) {
		$('.giphy').html(`
			<div class = 'error_giphy'>
  		<h1>Whoops!</h1>
  		<p>No gifs found</p>
  		</div>
			`);
	}
	else {
	let buildOutput = '';

	$.each(results, function(key, value) {
		buildOutput += '<div class = "gif"><img src = "' + value.images.downsized_medium.url +'" alt="gif for search word"></div>';
		console.log(results);
	});
	$('.giphy').html(buildOutput);
	}
}
$(handleSubmit);