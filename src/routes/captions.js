const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Caption = mongoose.model('Caption'),

/*
const isAuthenticated = (req, res, next) => {
  if(!req.user) {
    res.redirect('/'); 
    console.log('redirecting');
  } else {
    next();
  }
}
*/
//router.use(isAuthenticated)
router.get('/captions', (req, res) => {
	Caption.find({user: req.user ? req.user._id : undefined}, (err, captions, count) => {
		res.render('captions.hbs', {captions:captions});
	});
});

module.exports = router;