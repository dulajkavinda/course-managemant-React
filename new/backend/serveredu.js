const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let Edu = require('./educational.model');

mongoose.connect('mongodb://localhost:27017/todos', {
	useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB connected to application sucessfully!');
});

todoRoutes.route('/').get((req, res) => {
	Edu.find((err, todos) => {
		if (err) {
			console.log(err);
		} else {
			res.json(todos);
		}
	});
});

todoRoutes.route('/:id').get((req, res) => {
	let id = req.params.id;
	Edu.findById(id, (err, todo) => {
		res.json(todo);
	});
});

todoRoutes.route('/add').post((req, res) => {
	let todo = new Todo(req.body);
	todo
		.save()
		.then((todo) => {
			res.status(200).json({ todo: 'todo added sucessfully' });
		})
		.catch((err) => {
			res.status(400).send('adding todo failed');
		});
});

todoRoutes.route('/update/:id').put((req, res) => {
	let id = req.params.id;

	Edu.updateOne({ _id: id }, req.body)
		.then((res) => {
			res.status(200).send({ message: 'Course Updated', data: res.data });
		})
		.catch((err) => {
			res.status(500).send({ message: err });
		});
});

todoRoutes.route('/delete/:id').delete((req, res) => {
	let id = req.params.id;

	Edu.findByIdAndDelete(id, () => {
		res.send({ message: 'Record Removed' });
	});
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
	console.log(`Server Running at ${PORT}`);
});
