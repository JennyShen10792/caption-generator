const mongoose = require('mongoose')
const User = mongoose.model('User');

function displayRecord(record) {
	const contentEle = document.getElementById("messages");
	const div = document.createElement("div");
	div.innerText = record["captions"];
	contentEle.appendChild(div).setAttribute('onclick', 'doSomething()');
	// contentEle.appendChild(div)

}

function doSomething() {
	if (confirm('Are you sure you want to save this caption?')) {
		// Save it!
	} else {
		// Do nothing!
	}
}

function displayMessages() {


	let query = "";
	let keyword = document.getElementById("filterWord");
	let caption_category = document.getElementById("filterType");
	if (keyword.value != null || keyword.value != "") {
		query = "type=" + keyword.value;
	}

	if (caption_category.value != null || caption_category.value != "") {
		query1 = "category=" + caption_category.value;
	}

	let url = 'http://localhost:3000/api/captions';
	if (query != "") {
		url += "?" + query;
	}
	if (caption_category != "") {
		url += "&" + query1;
	}

	const contentEle = document.getElementById("messages");
	while (contentEle.firstChild) {
		contentEle.removeChild(contentEle.firstChild);
	}
	fetch(url)
		.then(response => response.json())
		.then(data => {
			{
				data.forEach(record => displayRecord(record))
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

function clickFilter(evt) {
	evt.preventDefault();

	displayMessages();
}

function main() {

	const filterBtn = document.getElementById("filterBtn");
	filterBtn.onclick = clickFilter;

	var anchor = document.getElementById("anchor");
	anchor.addEventListener('click', function (e) {
		console.log('button was clicked');

		fetch('/clicked', { method: 'POST' })
			.then(function (response) {
				if (confirm('Are you sure you want to save this caption?')) {
					console.log('click was recorded');
					return;
				}
				throw new Error('Request failed.');
			})
			.catch(function (error) {
				console.log(error);
			});
	});

	setInterval(function () {
		fetch('/clicks', { method: 'GET' })
			.then(function (response) {
				if (response.ok)
					return response.json();
				throw new Error('Request failed.');
			})
			.then(function () {

			})
			.catch(function (error) {
				console.log(error);
			});
	});

	// var messages = document.getElementById("messages");
	// messages.addEventListener('click', doSomething(), false);

}

document.addEventListener("DOMContentLoaded", main);