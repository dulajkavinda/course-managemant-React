const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
	todo_description: {
		type: String,
		required: true
	},
	todo_responsible: {
		type: String,
		required: true
	},
	todo_priority: {
		type: String,
		required: true
	},
	todo_address: {
		type: String,
		required: false
	},
	todo_gpa: {
		type: String,
		required: false
	},
	todo_Campus: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('Todo', Todo);
