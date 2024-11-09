const mongoose = require('mongoose'); 
const config = require('./config'); 


const dbUrl = config.db.url; 


const connection = async () =>{
    await mongoose.connect(dbUrl)
.then(console.log("DB is connected."))
.catch((error)=>console.log(error.message)); 
}

module.exports = connection; 