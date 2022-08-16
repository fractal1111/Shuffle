const mongoose = require('mongoose')


let rewardSchema = new mongoose.Schema({
    t: {
        type: String,
        required: true,
        trim:true
    },
    v: {
        type: Number,
        required: true,
        trim:true
    }
})

module.exports = new mongoose.model('reward',rewardSchema)