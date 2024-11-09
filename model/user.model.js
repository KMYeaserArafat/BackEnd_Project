const mongoose = require('mongoose'); 


const UserSchema = new mongoose.Schema({
    name:{
        type:String, 
        require:[true, "name is required"]
    }, 
    age:{
        type:Number, 
        require: [true, "Age is required"]
    }, 
    file:{
        type: String, 
    }, 
    UpdateTime:{
        type:Date, 
        default: Date.now()
    }
}); 


module.exports = new mongoose.model('UserDB2',UserSchema); 