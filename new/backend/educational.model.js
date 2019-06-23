const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Edu = new Schema({
	company: {
		type: String,
		required: true
	},
	website: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	skills: {
		type: String,
		required: false
	},
	githubusername: {
		type: String,
		required: false
	},
	twitter: {
		type: String,
		required: false
    },
    facebook: {
		type: String,
		required: false
    },
    linkedin: {
		type: String,
		required: false
    },
    youtube: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('edu', Edu);
