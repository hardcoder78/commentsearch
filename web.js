/*
	this file contains functions that are loaded into the page html
*/

function search_comments(q, comments) {

	const contents = document.querySelector('#contents .ytd-item-section-renderer');

	console.log(contents);

	/*
		here is the error: searching for '' in undefined
	*/
	console.log('searching for ' + q + ' in ' + contents.length);
}

console.log('web.js was loaded');