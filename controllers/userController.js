const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()

router.get('/register', (req, res) => {
    res.render('users/register.ejs')
})

router.post('/register', (req, res)=> {
    console.log(req.body)
    // we need to endrypt our passwords
    // we can use the bcrypt library
    // we need ti import the library
    // first we geneerate the salt
    const salt = bcrypt.genSaltSync(10)
    // salt is randogamrbage we add to our encrypted passwords
    // the number we pass to genSaltSync determines how much salt we're adding
    //the more salt the more secure
    
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)

    User.findOne({username: req.body.username}), (error, userExists)
        if (userExists) {
            res.send('That username is taken.')
        } else {
            User.create(req.body, (error, createdUser) => {
                if (createdUser) {
                    res.send('user created')
                } else {
                    res.send(error)
                }
                
            })
        }
})

router.get('/signin', (req, res) => {
    res.render('users/signin.ejs')
})

router.post('/signin', (req, res) => {
    // we need to get the user with that username
    User.findOne({username: req.body.username}, (error, foundUser) => {
        if (foundUser) {
            //if they do exist we need to compare their passwords
            // we can compare passswords using bcrypt's compareSync function
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            // compareSync returns true if they match and false if they dont
            if (validLogin) {
                req.session.currentuser = foundUser
                // wer're letting the session know 
                //that we have a user logged in
                res.redirect()
            } else {
                res.send('Invalid username or password')
            }
            
            console.log(validLogin)
            res.send('check your terminal')
        } else {
            // if they dont exist, we need to send a message
            res.send('Invalid username or password')
        }
    })
    // if they dont exist, we need to send a mesafe
    // if they do exist, we need to compare  their passwords
    // if the passwords match, log them in
    // if they don't match , send a message
    res.send('Hit the sign in route!')
})

// destroy session route
router.get('/signout', (req, res) => {
    req.session.destroy()
    
})

module.exports = router