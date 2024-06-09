const mongoose = require('mongoose')

async function connectMongo(url){
    return await mongoose.connect(url)
}

module.exports = {connectMongo}