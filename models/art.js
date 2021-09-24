const mongoose = require('mongoose')
const { Schema, model } = mongoose

const artSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    description: String,
    img: String,
    comment: String
})

const Art = model('Art', artSchema)

module.exports = Art