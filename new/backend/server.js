const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const todoRoutes1 = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

let Todo = require('./todo.model');
let Edu = require('./educational.model');

mongoose.connect('mongodb://localhost:27017/todos', {
	useNewUrlParser: true
});

const connection = mongoose.connection;

let gfs;

connection.once('open', () => {
	console.log(`MongoDB Running on localhost:27017`);
	gfs = Grid(connection.db, mongoose.mongo);
	gfs.collection('uploads');
});

const storage = new GridFsStorage({
	url: 'mongodb://localhost:27017/todos',
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(10, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: file.originalname,
					bucketName: 'uploads'
				};
				
				resolve(fileInfo);
			});
		});
	}
});
const upload = multer({ storage });

todoRoutes.route('/upload').post(upload.single('file'), (req, res) => {
	//res.json({ file: req.file });
	res.redirect('http://localhost:3000/files');
});

todoRoutes.route('/files').get((req, res) => {
	gfs.files.find().toArray((err, files) => {
		if (!files || files.length === 0) {
			return res.status(404).json({
				err: 'No Files Available'
			});
		}

		return res.json(files);
	});
});

todoRoutes.route('/file/:id').get((req, res) => {
	gfs.files.find({ contentType: req.params.id }).toArray((err, files) => {
		if (!files || files.length === 0) {
			return res.status(404).json({
				err: 'No Files Available'
			});
		}

		return res.json(files);
	});
});

todoRoutes.route('/files/:id').delete((req, res) => {
	gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
		if (err) {
			return res.status(404).json({ err: err });
		} else {
			console.log('succesful');

			res.redirect('http://localhost:3000/files');
		}
	});
});

todoRoutes.route('/').get((req, res) => {
	Todo.find((err, todos) => {
		if (err) {
			console.log(err);
		} else {
			res.json(todos);
		}
	});
});

todoRoutes.route('/:id').get((req, res) => {
	let id = req.params.id;
	Todo.findById(id, (err, todo) => {
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

	Todo.updateOne({ _id: id }, req.body)
		.then((res) => {
			res.status(200).send({ message: 'Course Updated', data: res.data });
		})
		.catch((err) => {
			res.status(500).send({ message: err });
		});
});

todoRoutes.route('/delete/:id').delete((req, res) => {
	let id = req.params.id;

	Todo.findByIdAndDelete(id, () => {
		res.send({ message: 'Record Removed' });
	});
});

todoRoutes1.route('/').get((req, res) => {
	Edu.find((err, todos) => {
		if (err) {
			console.log(err);
		} else {
			res.json(todos);
		}
	});

});

todoRoutes1.route('/:id').get((req, res) => {
	let id = req.params.id;
	Edu.findById(id, (err, todo) => {
		res.json(todo);
	});
});

todoRoutes.route('/edu/add').post((req, res) => {
	let todo = new Edu(req.body);
	todo
		.save()
		.then((todo) => {
			res.status(200).json({ todo: 'todo added sucessfully' });
		})
		.catch((err) => {
			res.status(400).send('adding todo failed');
		});
		
});

todoRoutes1.route('/update/:id').put((req, res) => {
	let id = req.params.id;

	Edu.updateOne({ _id: id }, req.body)
		.then((res) => {
			res.status(200).send({ message: 'Course Updated', data: res.data });
		})
		.catch((err) => {
			res.status(500).send({ message: err });
		});
});

todoRoutes1.route('/delete/:id').delete((req, res) => {
	let id = req.params.id;

	Edu.findByIdAndDelete(id, () => {
		res.send({ message: 'Record Removed' });
	});

});

app.use('/todos', todoRoutes);
app.use('/edu', todoRoutes1);

app.listen(PORT, () => {
	console.log(`Server Running at ${PORT}`);
});
