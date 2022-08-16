const express = require('express')
const router = express.Router()
const rewardController = require('../controller/rewardsController')
const userController = require('../controller/userController')
const gameController = require('../controller/gameController')
const mid = require('../timeCheckMiddleware/timeCheck')


router.post('/createReward',rewardController.createReward)
router.post('/createUser', userController.createUser)
router.post('/loginUser', userController.loginUser)
router.post('/gameBegins',mid.timeCheck, gameController.initialize)
router.put('/statsUpdate', gameController.updatingAndTerminating)

module.exports = router