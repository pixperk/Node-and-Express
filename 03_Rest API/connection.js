const mongoose = require("mongoose");

async function connectMongoDB(url){
 return await mongoose.connect(url)
  
}

module.exports = {
    connectMongoDB
}