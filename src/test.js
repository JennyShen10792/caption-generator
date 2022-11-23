const express = require('express')
const exhbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exhbs.engine({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.use(express.static('images'))

app.get("/home", (req, res) => {
    res.render("home");
});

const port = 5005

app.listen(port, ()=>{console.log('Server started on ${port}')})

