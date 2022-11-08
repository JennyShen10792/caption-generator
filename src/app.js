if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const app = express();
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
	passport,
	email => users.find(user => user.email === email),
	id => users.find(user => user.id === id)
)

const users = []

app.use(express.static(__dirname + '/public'));
app.get('/', function (request, response) {
	response.sendFile('/public/home.html', { root: '.' })
});



app.get('/api/captions', function (req, res) {

	console.log(req.query.type);
	if (req.query.type != null) {
		console.log("abs");
		let lyrics_list = [];

		(async () => {
			console.log("hi");
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			try {
				console.log("hello");
				await page.goto('https://www.lyrics.com/lyrics/' + req.query.type, { timeout: 180000 });
				let bodyHTML = await page.evaluate(() => document.body.innerHTML);
				console.log(bodyHTML);
				let $ = cheerio.load(bodyHTML);
				let label = $('.lyric-meta-title');
				let output = label.find('pre').text();
				console.log(output);
				$('.lyric-body').each((index, element) => {
					const lyrics = $(element).text();
					lyrics_list.push({
						'lyrics': lyrics
					})
				});

			} catch (err) {
				console.log(err);
			}

			await browser.close();
			console.log(lyrics_list)
			res.send(lyrics_list);
		})();
	}
});

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
	// secret: process.env.SESSION_SECRET,
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// app.get('/', (req, res) => {
// 	res.render('sample.ejs', { name: req.user.name })
// })



app.get('/login', checkNotAuthenticated, (req, res) => {
	// res.render('sample.ejs')
	res.render('sample.ejs')
	// res.render('/public/login.html')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('register.ejs')
	// res.render('/public/register.html')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		})
		res.redirect('/login')
	} catch {
		res.redirect('/register')
	}
	console.log(users)
})

//redirect to login page
app.get('/logout', (req, res) => {
	req.logOut()
	res.redirect('/')
})

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next()

	res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return res.redirect('/login')
	next()
}


app.listen(3000);
