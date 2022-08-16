const rewardmodel = require('../models/Reward')
const gameModel = require('../models/game')
const userModel = require('../models/user')




const initialize = async function (req, res) {
    //perform authentication and authorization
    try {
        let userId = req.body.id

        let gameData = await gameModel.findOne({
            userId: userId
        })


        if (gameData) {
            

                        let rewardsAvailable = await rewardmodel.find({
                            t: "gold"
                        }) // only gold rewards for now

                        let rewardsToBeGiven = []
                        for (let i = 0; i < 3; i++) {
                            rewardsToBeGiven.push(rewardsAvailable[Math.floor((Math.random() * rewardsAvailable.length))])
                        }

                        let reward = rewardsToBeGiven[Math.floor(Math.random() * rewardsToBeGiven.length)]

                        let ts = new Date
                        let year = ts.getFullYear()
                        let month = ts.getMonth()
                        let date = ts.getDate()
                        let timeStamp = {}
                        timeStamp['year'] = year
                        timeStamp['month'] = month
                        timeStamp['date'] = date


                        let userInfo = await gameModel.findOneAndUpdate({
                            userId: userId
                        }, {
                            $set: {
                                reward: reward,
                                timeStamp: timeStamp
                            }
                        })


                        return res.status(200).send({
                            data: rewardsToBeGiven
                        }) // rewards to be shown to the user

                  
            }


        else {
            // we create data for the first time for user

            let rewardsAvailable = await rewardmodel.find({
                t: "gold"  // specifically for gold
            })



            let rewardsToBeGiven = []
            for (let i = 0; i < 3; i++) {
                rewardsToBeGiven.push(rewardsAvailable[Math.floor((Math.random() * rewardsAvailable.length))])
            }
           
            let reward = rewardsToBeGiven[Math.floor(Math.random() * rewardsToBeGiven.length)]

            let ts = new Date
            let year = ts.getFullYear()
            let month = ts.getMonth()
            let date = ts.getDate()
            let timeStamp = {}
            timeStamp['year'] = year
            timeStamp['month'] = month
            timeStamp['date'] = date




            let gameData = await gameModel.create({
                userId: userId,
                reward: reward,
                timeStamp: timeStamp,

            }) // creation of game data

            return res.status(200).send({
                data: rewardsToBeGiven
            }) // rewards to be shown to the user
        }
    } catch (err) {

        return res.status(500).send({

            Status: false,
            message: err.message
        })
    }

}



const updatingAndTerminating = async function (req, res) {
    //fetch reward from db
    try {
        let userId = req.body.userId
        let rewardToBeGiven = await gameModel.findOne({
            userId: userId
        })
        if(!rewardToBeGiven){ return res.status(400).send({
            Status: false,
            message: "Please play game first"
        })}

        if (rewardToBeGiven.reward == null) {
            return res.status(400).send({
                Status: false,
                message: "Please play game first"
            })
        }
      
        let value = rewardToBeGiven.reward[0].v
        let type = rewardToBeGiven.reward[0].t
        let updatedStats = await userModel.findOneAndUpdate({
            _id: userId
        }, {
            $inc: {
                [`stats.${type}`]: value  
            }
        }, {
            new: true
        })
      
        let updatedReward = await gameModel.findOneAndUpdate({
            userId: userId
        }, {
            $set: {
                reward: null
            }
        }) // To set the reward back to null

        return res.status(200).send({
            data: updatedStats
        })
    } catch (err) {
        return res.status(500).send({
            Status: false,
            message: err.message
        })
    }

}




module.exports = {
    updatingAndTerminating,
    initialize
}