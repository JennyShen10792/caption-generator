const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Caption = mongoose.model('Caption');

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
  Caption.find({ user: req.user ? req.user._id : undefined }, (err, captions, count) => {
    res.render('captions.hbs', { captions: captions });
  });
});


router.get('/delete', (req, res) => {
	Caption.findByIdAndRemove(req.query.id, function (err) {
  		if (err) {
  			console.log(err);
		}
		else {
			res.redirect('/captions');
		}
	});			
});

// router.get('/search', (req, res) => {
// 	const { keyword_search } = req.body;
//   var cursor = Caption.find();
//   cursor.forEach(function(doc) {
//     var checker = Caption['name'];
//       if(checker.includes(keyword_search)){
//         cursor.find();
//       }
//       else {
//         res.redirect('/captions');
//       }
//   })
// });
module.exports = router;