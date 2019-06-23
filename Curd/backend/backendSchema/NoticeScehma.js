const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
	name: {
		type: String
	},
	note: {
		type: String
	},
	course: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('notices', noticeSchema);
