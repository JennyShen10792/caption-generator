const express = require('express');
const app = express();

app.get('/', function(request, response){
	response.sendFile('/public/home.html', { root: '.' })
});
app.listen(3000);