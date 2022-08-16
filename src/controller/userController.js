 const userModel = require('../models/user')
 const v = require('../validator/validator')


 const createUser = async function (req, res) {
     try {
         let data = req.body
         let {
             name,
             email,
             password
         } = data
         if (!v.isValid(name)) {
             return res.status(400).send({
                 Status: false,
                 mesage: "Please provide name field adn enter name"
             })
         }
         if (!v.isValid(email)) {
             return res.status(400).send({
                 Status: false,
                 mesage: "Please provide email field and enter email"
             })
         }
         let dupliEmail = await userModel.findOne({
             email: email
         })

         if (dupliEmail) {
             return res.status(400).send({
                 Status: false,
                 mesage: "Email already in use"
             })
         }

         if (!v.isValidEmail(email)) {
             return res.status(400).send({
                 Status: false,
                 message: "Please enter a valid email"
             })
         }

         if (!v.isValid(password)) {
             return res.status(400).send({
                 Status: false,
                 mesage: "Please provide password field and enter passsword"
             })
         }



         let createdUser = await userModel.create({
             name: name,
             email: email,
             password: password
         })

         return res.status(201).send({
             status: true,
             data: createdUser
         })
     } catch (err) {
         return res.status(500).send({
             Status: false,
             message: err.message
         })
     }

 }


 const loginUser = async function (req, res) {
     try {
         let data = req.body
         let {
             email,
             password
         } = data
         if (!v.isValidEmail(email)) {
             return res.status(400).send({
                 Status: false,
                 message: "Please enter a valid email"
             })
         }
         if (!v.isValid(password)) {
             return res.status(400).send({
                 Status: false,
                 mesage: "Please provide name field adn enter name"
             })
         }

         let user = userModel.find({
             email: email,
             password: password
         })




         if (!user) {
             return res.status(404).send({
                 Status: false,
                 message: "User not found"
             })
         }
         return res.status(200).send({
             Status: true,
             message: "User Logged in"
         })
     } catch (err) {
         return res.status(500).send({
             Status: false,
             message: err.message
         })
     }
 }


 module.exports = {
     createUser,
     loginUser
 }