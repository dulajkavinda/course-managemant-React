const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const app = express();
const course_router = express.Router();

const Courses = require('./backendSchema/CourseSchema');
const Notes = require('./backendSchema/NoticeScehma');

app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/stdentInfo', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
	console.log(`MongoDB Running on localhost:27017`);
	gfs = Grid(connection.db, mongoose.mongo);
	gfs.collection('course_metrials');
});

const storage = new GridFsStorage({
	url: 'mongodb://localhost:27017/stdentInfo',
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(10, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: file.originalname,
					contentType: req.body.dropdown,
					bucketName: 'course_metrials'
				};
				console.log(fileInfo.courseName);

				resolve(fileInfo);
			});
		});
	}
});
const upload = multer({ storage });

course_router.route('/upload').post(upload.single('file'), (req, res) => {
	// res.json({ file: req.file });
	res.redirect('http://localhost:3000/upload');
});

course_router.route('/files').get((req, res) => {
	gfs.files.find().toArray((err, files) => {
		if (!files || files.length === 0) {
			return res.status(404).json({
				err: 'No Files Available'
			});
		}

		return res.json(files);
	});
});

course_router.route('/file/:id').get((req, res) => {
	gfs.files.find({ contentType: req.params.id }).toArray((err, files) => {
		if (!files || files.length === 0) {
			return res.status(404).json({
				err: 'No Files Available'
			});
		}

		return res.json(files);
	});
});

course_router.route('/files/:id').delete((req, res) => {
	gfs.remove({ _id: req.params.id, root: 'course_metrials' }, (err, gridStore) => {
		if (err) {
			return res.status(404).json({ err: err });
		} else {
			console.log('succesful');

			res.redirect('http://localhost:3000/upload');
		}
	});
});

course_router.route('/fileContent/:id').delete((req, res) => {
	gfs.remove({ contentType: req.params.id, root: 'course_metrials' }, (err, gridStore) => {
		if (err) {
			return res.status(404).json({ err: err });
		} else {
			console.log('succesful');

			res.redirect('http://localhost:3000/upload');
		}
	});
});

course_router.route('/addCourse').post((req, res) => {
	const newCourse = new Courses(req.body);

	newCourse
		.save()
		.then(() => {
			res.status(200).send({ message: 'Course Added' });
		})
		.catch((err) => {
			res.status(500).send({ message: err });
		});
});

course_router.route('/addNote').post((req, res) => {
	const newNote = new Notes(req.body);

	newNote
		.save()
		.then(() => {
			res.redirect('http://localhost:3000/note');
		})
		.catch((err) => {
			res.status(500).send({ message: err });
		});
});

course_router.route('/getAllnotes').get((req, res) => {
	Notes.find((err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

course_router.route('/getNotes/:id').get((req, res) => {
	let id = req.params.id;

	Notes.findById(id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

course_router.route('/deleteNote/:id').delete((req, res) => {
	let id = req.params.id;

	Notes.findByIdAndDelete(id, () => {
		res.redirect('http://localhost:3000/note');
	});
});

course_router.route('/updateNote/:id').put((req, res) => {
	let id = req.params.id;

	Notes.updateOne({ _id: id }, req.body)
		.then((res) => {
			res.redirect('http://localhost:3000/note');
		})
		.catch((err) => {
			res.status(500).send({ message: err });
		});
});

course_router.route('/getAll').get((req, res) => {
	Courses.find((err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

course_router.route('/get/:id').get((req, res) => {
	let id = req.params.id;

	Courses.findById(id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

course_router.route('/delete/:id').delete((req, res) => {
	let id = req.params.id;

	Courses.findByIdAndDelete(id, () => {
		res.send({ message: 'Record Removed' });
	});
});

course_router.route('/update/:id').put((req, res) => {
	let id = req.params.id;

	Courses.updateOne({ _id: id }, req.body)
		.then((res) => {
			res.status(200).send({ message: 'Course Updated', data: res.data });
		})
		.catch((err) => {
			res.status(500).send({ message: err });
		});
});

//File Upload

let gfs;

app.use('/courses', course_router);

app.listen(PORT, () => {
	console.log(`Backend Running on ${PORT}`);
});
