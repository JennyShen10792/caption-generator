function displayRecord(record) {
	const contentEle = document.getElementById("messages");
	const div = document.createElement("div");
	div.innerText = record["lyrics"];
	contentEle.appendChild(div);

}

function displayMessages() {


	let query = "";
	let keyword = document.getElementById("filterWord");
	if (keyword.value != null || keyword.value != "") {
		query = "type=" + keyword.value;
	}

	let url = 'http://localhost:3000/api/captions';
	if (query != "") {
		url += "?" + query;
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

}

document.addEventListener("DOMContentLoaded", main);