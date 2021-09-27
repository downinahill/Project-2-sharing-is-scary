// imports
require('dotenv').config()
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const multer = require('multer')
const ejsLint = require('ejs-lint');
const upload = multer({ dest: './public/data/uploads/Images' })

const PORT = process.env.PORT
// Connect to Database

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, () => {
	console.log('db connected');
})

const db = mongoose.connection

db.on('connected', () => {
	console.log('mongoose connect to', MONGODB_URI);
})

db.on('disconnected', () => {
	console.log('mongoose disconnect to', MONGODB_URI);
})

db.on('error', (error) => {
	console.log('mongoose error', error);
})

// middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(multer({dest:__dirname+'/Images/'}).any());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));


// controllers

const artController = require('./controllers/artController')
app.use('/art', artController)



let storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, __dirname+'/public/uploads')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now()+file.originalname)
	}
  });
  
  app.post('/add/details', upload.any(), function(req,res){
	 var data = req.body;
	 // path of uploaded file.
	 data.propic = '/public/uploads/Images'+req.files[0].filename;
	 res.render('index',{
		"data": data
	 });
  });




// listen

app.listen(PORT, () => {
	console.log('listen on port:', PORT);
})