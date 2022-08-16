const gameModel = require('../models/game')
const timeCheck = async function (req, res, next) {
    try {
        let userId = req.body.id

        let gameData = await gameModel.findOne({
            userId: userId
        })

        if (gameData) {
            let curDate = new Date()

            if (gameData.timeStamp.year < curDate.getFullYear()) {
                next()
            } else if (gameData.timeStamp.year == curDate.getFullYear()) {
                if (gameData.timeStamp.month < curDate.getMonth()) {
                    next()
                } else if (gameData.timeStamp.month == curDate.getMonth()) {
                    if (gameData.timeStamp.date < curDate.getDate()) {
                        next()
                    } else if (gameData.timeStamp.date == curDate.getDate()) {
                        return res.status(400).send({
                            Status: false,
                            message: "Game can be played only once per day"
                        })
                    } else {
                        return res.status(400).send({
                            Status: false,
                            message: "Data has been manipulated"
                        })
                    }
                } else {
                    return res.status(400).send({
                        Status: false,
                        message: "Data has been manipulated"
                    })
                }
            } else {
                return res.status(400).send({
                    Status: false,
                    message: "Data has been manipulated"
                })
            }



        } else {
            next()
        }

    } catch (err) {
        return res.status(400).send({
            Status: false,
            message: err.message
        })
    }
}

module.exports ={timeCheck}