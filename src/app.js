const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response){
	response.sendFile('/public/home.html', { root: '.' })
});
app.listen(3000);