const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
  passportLocalMongoose = require('passport-local-mongoose');
  
  
const User = new mongoose.Schema({
  	// username, password
  	captions:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Caption' }]
});
const Caption = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	name: {type: String, required: true},
});


User.plugin(passportLocalMongoose);
Caption.plugin(URLSlugs('name'));

mongoose.model('User', User);
mongoose.model('Caption', Caption);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'PRODUCTION') {
	// if we're in PRODUCTION mode, then read the configration from a file
	// use blocking file io to do this...
	const fs = require('fs');
	const path = require('path');
	const fn = path.join(__dirname, 'config.json');
	const data = fs.readFileSync(fn);

	// our configuration file will be in json, so parse it and set the
	// conenction string appropriately!
	const conf = JSON.parse(data);
	dbconf = conf.dbconf;
} else {
	// if we're not in PRODUCTION mode, then use
 	dbconf = 'mongodb://127.0.0.1:27017/project';
}

console.log("dbconf: ", dbconf);

mongoose.connect(dbconf);
