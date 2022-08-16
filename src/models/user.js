const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    stats: {

        gold: {
            type: Number,
            default: 100
        }

    }
})
module.exports = new mongoose.model('user', userSchema)