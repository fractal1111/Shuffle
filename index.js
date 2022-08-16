const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./src/routes/routes')

const app  = express()

app.use(bodyParser.json())

app.use('/',routes)


mongoose.connect("mongodb+srv://Parth1111:reyBhp3yMRG7Kilc@cluster0.9doof.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlparser:true})
.then(()=>console.log("MongoDb is connected"))
.catch(err =>console.log(err))

app.listen(3000 ,function(){return console.log("express is running")})