function displayRecord(record) {
    const contentEle = document.getElementById("messages");
    const div = document.createElement("div");
    div.innerText = record["captions"];
    div.className = "col-md-7 rounded fs-6 mx-auto text-wrap text-center bgMsg p-3";
    contentEle.appendChild(div);
}

function doSomething(event) {
    if (confirm('Are you sure you want to save this caption?')) {
        // Save it!
        alert('Caption was saved!');

        var source = event.target || event.srcElement;
        console.log(source);
        console.log(source.innerText);


    } else {
        // Do nothing!
        alert('Caption was not saved.');
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

    let url = '/api/captions';
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
    anchor.addEventListener('click', doSomething(), false);

    // var messages = document.getElementById("messages");
    // messages.addEventListener('click', doSomething(), false);

}

document.addEventListener("DOMContentLoaded", main);
