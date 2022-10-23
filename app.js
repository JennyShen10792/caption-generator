const express = require('express');
const app = express();

app.get('/', function(request, response){
    response.sendFile('/Users/jennyshen/Collab/Project2/home.html');
});
app.listen(3000);