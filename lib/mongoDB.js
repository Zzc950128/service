'use strict'

const mongoose = require('mongoose')
const config = require('../config')
const url = "mogondb://" + config.mongoDB.host + ":" + config.mongoDB.port + "/" + config.mongoDB.database

const connectDB = () => {
    mongoose.connect(url)

    mongoose.connection.on('connected', function() {
        console.log(`${url} Connecting database successfully`)
    })

    mongoose.connection.on('error', function() {
        console.log(`${url} Failed to connect to database`)
    })    
    
    mongoose.connection.on('disconnected', function() {
        console.log(`${url} Closed to connect to database`)
    })
}

module.exports = connectDB