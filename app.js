const express = require('express'); 
const app = express(); 
const User = require('./routes/user.routes');



app.use('/', User); 


app.get('/', (req,res)=>{
     try {
       res.sendFile(__dirname + '/view/index.html'); 
     } catch (error) {
        res.status(404).send({
            operation:false, 
            message:"get request not found!", 
            error_message: error.message
        }); 
     }
}); 


app.use((req,res)=>{
    try {
        res.send("<h1> 404 || Routes can't found </h1>")
    } catch (error) {
        res.status(404).send({
            operation:false, 
            error_message: error.message
        }); 
    }
}); 


module.exports = app;