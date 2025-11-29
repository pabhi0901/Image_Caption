const mongoose = require("mongoose")
async function connectToDB(){
   await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    console.log("App connected to DB succesfully");
}

module.exports = connectToDB