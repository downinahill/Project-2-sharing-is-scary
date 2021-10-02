// imports
require('dotenv').config()
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const multer = require('multer')
const ejsLint = require('ejs-lint');
// let upload = multer({ dest: './public/data/uploads/Images' })

const PORT = process.env.PORT || 3000
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
// app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
// app.use(multer({dest:__dirname+'/Images/'}).any());
// app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));


// controllers

const artController = require('./controllers/artController')
app.use('/art', artController)



 
  
// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {        
        // null as first argument means no error
        cb(null, "./public/uploads/" )
    },
    filename: function (req, file, cb) {        
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )
    }
})

// Init upload
// const upload = multer({
//     storage: storage, 
//     limits: {
//         fileSize: 100000000
//     },

//     fileFilter: function (req, file, cb) {
//         sanitizeFile(file, cb);
//     }

// })

const upload = multer({

	storage: storage
})

// // Set view engine
// app.set('view engine', 'ejs')







// Set the initial route
app.get('/', (req, res) => {
    res.render('index');
})


// Handle the upload route
app.post('/uploads', upload.single("uploaded_file"), (req, res) => {
	console.log(req.file, req.body)
    // res.send('done');
    // upload(req, res, (err) => {
    //     if (err){ 
	// 		console.log(err)
    //         // res.render('index', { msg: err})
	// 		res.redirect("/art")

    //     }else{
    //         // If file is not selected
    //         if (req.file == undefined) {
	// 			console.log("errb")
    //             res.render('index', { msg: 'No file selected!' })

    //         }
    //         else{ console.log("errc")
    //             res.render('index', { 
    //               msg: 'File uploaded successfully!', 
    //               file: `uploads/${req.file.filename}` 



    //          });
    //         }

    //     }

    // })
})

function sanitizeFile(file, cb) {
    // Define the allowed extension
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']

    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/")

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true) // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed!')
    }
}







// listen

app.listen(PORT, () => {
	console.log('listen on port:', PORT);
})