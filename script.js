/*
	inject another file:
	https://stackoverflow.com/questions/9515704/access-variables-and-functions-defined-in-page-context-using-a-content-script/9517879#9517879
*/
var s = document.createElement('script');
s.src = chrome.runtime.getURL('web.js');
s.onload = function() {
	this.remove();
};
(document.head || document.documentElement).appendChild(s);


/*
	add listener for Youtube scrolling event
*/
document.addEventListener("scroll", detectYoutubeComments);


/*
	detect Youtube comments counter
*/
function detectYoutubeComments() {

	/* catch the comments counter */
	var counter = document.querySelector("#count>.count-text.style-scope.ytd-comments-header-renderer span");

	if(counter !== null) {
		// var comments = document.querySelector('#contents > ytd-comment-thread-renderer');
		var comments = document.querySelector('#contents');

		var comment_search = document.querySelector("#comment_search");

		if(comment_search === null) {
			console.log('I am scrolling - counter (' + counter.innerText + ') is defined and search div is being written');
			console.log('counter: ' + counter.innerText);
			console.log('#contents: ' + comments.length);

			createYoutubeCommentSearchBox();
		}

	} else {

		console.log('I am scrolling - counter is not defined');
	}

}

/*
	create search box above Youtube comments
*/
function createYoutubeCommentSearchBox() {

	/* create search box div */
	const searchBoxDiv = document.createElement('div');
	searchBoxDiv.setAttribute('id', 'comment_search');
	searchBoxDiv.setAttribute('class', '');

	/* place search box div above comments */
	const targetElement = document.getElementById('ticket-shelf');
	targetElement.appendChild(searchBoxDiv);

	/* add label */
	document.getElementById("comment_search").innerHTML = "Search comments";

	/* add search input */
	const input = document.createElement('input');
	input.setAttribute('id', 'comment_search_q');
	input.setAttribute('placeholder', 'Type your search here');
	input.setAttribute('oninput', "search_comments(this.value, comments )");

	const targetElement2 = document.getElementById('comment_search');
	targetElement2.appendChild(input);

	/* focus cursor */
	document.getElementById('comment_search_q').focus();

	const resultDiv = document.createElement('div');
	resultDiv.setAttribute('id', 'comment_search_results');
	targetElement2.appendChild(resultDiv);

}

function detectHost() {

	if (window.location.href.indexOf('youtube') > -1) {
		  console.log('this is youtube');
	} else if (window.location.href.indexOf('facebook') > -1) {
		  console.log('this is facebook');
	}
}
