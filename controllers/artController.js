const express = require('express')
const Router = express.Router()
const Art = require('../models/art.js')

// seed route
router.get('/seed', async (req, res) => {
    const newArt =
    [
        {
            name: 'A Day in the Life (prints)',
            description: 'A day in the life of an addict living in the DC area',
            img: '/Users/brianhill/Desktop/Art Website/Images/495.jpeg',
            price: '$20',
            qty: 'unlimited'

        }, 
    ]
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
router.get('/', (req, res) => {
    try{
        res.render('new.ejs')
    }
    catch(err) {
        res.send(err.message)
    }
})

// show route
router.get('/:id', (req, res) => {
    try{
        Art.findById(req.params.id, (err, foundArt) => {
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
                res.redirect('/products/' + req.params.id)
            }
        })
    }
    catch(err) {
        res.send(err.message)
    }
})



module.exports = router