function displayMessages() {
/*
	const tbody = document.querySelector("tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
*/
	let query = "";
	let keyword = document.getElementById("filterWord");
	if (keyword.value != null || keyword.value != "") {
		query = "type=" + keyword.value;
	}
	console.log (query);
	let url = 'http://localhost:3000/api/captions';
	if (query != "") {
		url += "?" + query;
	}

	
	fetch(url)
  	.then(response => response.json());
  //	.then(data => data.forEach(element => addReview(element)));
}

function clickFilter(evt) {
	evt.preventDefault();
	
	displayMessages();
}

function main() {
	//const addBtn = document.getElementById("addBtn"); 
	//addBtn.onclick = clickAdd;
	
	const filterBtn = document.getElementById("filterBtn"); 
	filterBtn.onclick = clickFilter;	
	
	//displayMessages();
}

document.addEventListener("DOMContentLoaded", main);