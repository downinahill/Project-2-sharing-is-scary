// imports
require('dotenv').config()
const express = require('express')

const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
const mongoose = require('mongoose')

const PORT = process.env.PORT

// connect to database

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('db connected')
})

const db = mongoose.connection

db.on('connected', () => {
    console.log('mongoose connect to', MONGODB_URI)
})

db.on('disconnected', () => {
    console.log('mongoose disconnect to', MONGODB_URI)
})

db.on('error', (error) => {
    console.log('mongoose error', error)
})

// midddleware

app.use(express.static('public'))
app.use(methodOverride('_method'))

//controllers

const productsController = require('./controllers/artController')
app.use('/art', artController)




//listen

app.listen(PORT, () => {
    console.log('listen on port:', PORT)
})
