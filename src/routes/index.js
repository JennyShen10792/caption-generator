const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Caption = mongoose.model('Caption');


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
}

router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err)
      return res.status(500).send(err);
    res.redirect('/');
  })
});

router.get('/', (req, res) => {
  res.render('home');
});
// router.get('/', isLoggedIn, (req, res) => {
//   res.render('home');
// });

// router.get('/login', (req, res) => {
//   res.render('login');
// });

router.get('/login', isLoggedOut, (req, res) => {
  const response = {
    title: "Login",
    error: req.query.error
  }

  res.render('login', response);
});

router.get('/register', isLoggedOut, (req, res) => {
  const response = {
    title: "Register",
    error: req.query.error
  }

  res.render('register', response);
});

/*
router.get('/captions', (req, res) => {
    User.find(function(err, captions, count) {
    res.render( 'captions', {
      captions: captions
    });
  });
})
*/

router.get('/captions', (req, res) => {
  Caption.find({ user: req.user ? req.user._id : undefined }, (err, captions, count) => {
    res.render('captions', { captions: captions });
  });
});




router.get('/captions/save', function (req, res) {
  res.render('save');
});



router.post('/captions/save', function (req, res) {
  console.log(req.body.captionName);
  new Caption({
    user: User,
    name: req.body.captionName
  }).save(function (err, caption, count) {
    res.redirect('/captions');
  });
});

router.get('/captions/delete', (req, res) => {
  Caption.findByIdAndRemove(req.query.id, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/captions');
    }
  });
});






router.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.register(new User({ username }), req.body.password, (err, user) => {
    if (err) {
      // res.render('register', { message: 'Your registration information is not valid' });
      res.redirect('/register?error=true')
    } else {
      res.redirect('/login');
      // passport.authenticate('local')(req, res, function () {
      //   // res.redirect('/');
      //   res.redirect('/login');
      // });
    }
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (user) {
      req.logIn(user, (err) => {
        res.redirect('/');
      });
    } else {
      // res.render('login', { message: 'Your login or password is incorrect.' });
      res.redirect('/login?error=true');
    }
  })(req, res, next);
});

router.post('/captions', (req, res) => {
  res.render('captions')
});

router.get('/api/captions', async(req, res) => {


  const captions = await Caption.find({user: req.user ? req.user._id : undefined});

 res.status(200).json({success:true,data:captions})
});


router.get('/captions', (req, res) => {
	Caption.find({user: req.user ? req.user._id : undefined}, (err, captions, count) => {
		res.render('captions', {captions:captions});
	});
});

router.post('/captions/save', function(req, res) {
	console.log(req.body.captionName);
	new Caption({
		user:User,
		name: req.body.captionName
	}).save(function(err, caption, count){
		res.redirect('/captions');
	});
});
module.exports = router;
