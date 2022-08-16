const rewardModel = require('../models/Reward')

const createReward = async function (req, res) {
    try {

        let data = req.body
        console.log(data)
        let rewardCreated = await rewardModel.create(
            data
        )
        console.log(rewardCreated)
        return res.status(201).send({
            Status: true,
            message: "reward reated successfuly",
            data: rewardCreated
        })

    } catch (err) {
        return res.status(500).send({
            Status: false,
            message: err.message
        })
    }
}
module.exports= {createReward}