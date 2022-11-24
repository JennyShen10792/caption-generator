function displayRecord(record) {
    const contentEle = document.getElementById("messages");
    const div = document.createElement("div");
    div.innerText = record["captions"];
    //setAttribute('onclick', 'saveCaption');
    div.setAttribute('onclick', 'saveCaption(this)');
    //contentEle.onClick=saveCaption;
    contentEle.appendChild(div);
    
}

function saveCaption(ele) {
    if (confirm('Are you sure you want to save this caption?')) {
        // Save it!
        alert(event);
      //  var source = event.srcElement || event.target;
        var caption = ele.innerText;
 
        let data = {
            "caption": caption
        }
        console.log(data);
        fetch('http://localhost:3000/api/caption/save', {
            method: 'POST',  
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
                console.log('Success:', data);
                alert('Caption was saved!');
        })
        .catch((error) => {
                console.error('Error:', error);
        });        

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

    //var anchor = document.getElementById("anchor");
   // anchor.addEventListener('click', doSomething(), false);

    // var messages = document.getElementById("messages");
    // messages.addEventListener('click', doSomething(), false);

}

document.addEventListener("DOMContentLoaded", main);
