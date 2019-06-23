const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
	name: {
		type: String
	},
	enrollKey: {
		type: String
	},
	year: {
		type: String
	},
	feild: {
		type: String
	},
	lecInCharge: {
		type: String
	}
});

module.exports = mongoose.model('course', courseSchema);
