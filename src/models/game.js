const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


let gameSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    reward: {
        type: []
    },
    timeStamp: {
        year: {
            type: Number
        },
        month: {
            type: Number
        },
        date: {
            type: Number
        }

    }
})


module.exports = new mongoose.model('gameData',gameSchema)