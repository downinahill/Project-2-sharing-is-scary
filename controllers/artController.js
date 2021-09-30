const express = require('express')
const router = express.Router()
const Art = require('../models/art.js')
const multer  = require('multer')
// const upload = multer({ dest: './public/data/uploads/' })

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
const upload = multer({

	storage: storage
})







// seed route
router.get('/seed', async (req, res) => {
    Art.create([
        {
            name: 'A Day in the Life',
            description: 'A day in the life of an addict living in the DC area',
            img: '../Images/495.jpg',
            comment: '',

        },
        {
            name: 'Jerry Garcia Portrait',
            description: 'Colored pencil portrait of Jerry Garcia',
            img: '../Images/jerry garcia 1.jpg',
            comment: '',
        },
        {
            name: 'Metro Mayhem',
            description: 'Collage/mural of the DMV/Nova scene',
            img: '../Images/choose life 2.jpg',
            comment: '',
        },
        {
            name: 'Cris Cornell',
            description: 'Pencil Portrait of Chris Cornell',
            img: '../Images/chris cornell.jpg',
            comment: '',
        },
        {
            name: 'Fallen Angel',
            description: 'An intense image of an angel disemboweling himself at the the throne of God',
            img: '../Images/fallenangel.jpg',
            comment: '',
        },
        {
            name: 'Jerry Garcia',
            description: 'Pencil portrait of Jerry Garcia',
            img: '../Images/JerryGarcia.jpg',
            comment: '',
        }

    ], (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/art')
    })
})


//index route
router.get('/', (req, res) => {
    try{
        Art.find({}, (err, allArt) => {
            res.render('index.ejs', {
                art: allArt
            })
        })
    }
    catch (err) {
        res.send(err.message)
    }
 })

// new route
router.get('/new', (req, res) => {
    try{
        res.render('new.ejs')
    }
    catch(err) {
        res.send(err.message)
    }
})


router.get('/destroy', (req, res) => {
    Art.collection.drop()
    res.redirect('/art')
})



// show route
router.get('/:id', (req, res) => {
    try{
        Art.findById(req.params.id, (err, foundArt) => {
            console.log(foundArt)
            res.render('show.ejs', {
                art: foundArt

            })
        })

    }
    catch(err) {
        res.send(err.message)
    }
})

// edit route
router.get('/:id/edit', (req, res) => {
    try{
        Art.findById(req.params.id,  (err, foundArt) => {
            if(err) {
                res.send(err)
            } else {
                res.render('edit.ejs', {
                    art: foundArt
                })
            }
        })
    }
    catch(err) {

        res.send(err.message)
    }
})

//update route
router.put('/:id/', (req, res) => {
    try{
        Art.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedArt) => {
            if(err) {
                res.send(err)
            } else {
                res.redirect('/art/' + req.params.id)
            }
        })
    }
    catch(err) {
        res.send(err.message)
    }
})



//post route

router.post('/', upload.single("uploaded_file"), (req,res)=>{
    req.body.img = "../uploads/" + req.file.filename
    console.log(req.body)
    Art.create(req.body, (error, createdArt) => {
        if (error){
            console.log(error)
            res.send(error)
        } else {
            res.redirect('/art')
        }
    })
})




//delete route

router.delete('/:id', (req, res) => {
	try{
		Art.findByIdAndDelete(req.params.id, (err, deletedArt) => {
			if (err){
				console.log(err)
				res.send(err)
			} else {
			res.redirect('/art')
			}
		})
	}
	catch (err) {
		res.send(err.message)
	}
})


module.exports = router