const path = require('path');
const multer  = require('multer')
const User = require('../model/user.model'); 
const express = require('express'); 
const app = express(); 

// body-parser, 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'UploadFiles')); // Corrected path
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })



const getUserInformation = async (req,res)=>{
    try {
        const ShowAllUser = await User.find(); 
        res.send(ShowAllUser); 
    } catch (error) {  
       res.status(404).send({
          operation:false, 
          message: "userInformation get Routes not Found!", 
          error_message: error.message
       }); 
    }
}

// Add new User, 
const AddUserData = (req, res) => {
    try { 
        upload.single('file')(req, res, async (err) => {
            if (err) {
                return res.status(500).send({
                    operation: false,
                    message: "Error uploading file",
                    error_message: err.message
                });
            }
            const NewUser = await User({
                 name:req.body.name, 
                 age:req.body.age, 
                 file:req.file.filename
            }); 
            res.send(NewUser.save());
        });
    } catch (error) {
        res.status(404).send({
            operation: false,
            message: "userInformation Post Route not found!",
            error_message: error.message
        }); 
    }
};


// Search One User, 
const SearchUser = async(req,res)=>{
      try {
        const id = req.params.id; 
        const SearchId = await User.find({_id:id}, {_id:0, name:1,age:1,file:1}); 
        res.send(SearchId); 
      } catch (error) {
        res.status(404).send({
            operation: false,
            message: "userInformation get/:id Route not found!",
            error_message: error.message
        }); 
      }
}; 


// Update User Data, 
const UpdateUser = async(req,res)=>{
    try {
      const id = req.params.id; 
      const UpdateUser = await User.findByIdAndUpdate(
        {_id:id},
        {$set: {age:23}}, 
        {new:true}); 
      res.send(UpdateUser);

    } catch (error) {
      res.status(404).send({
          operation: false,
          message: "userInformation Post Route not found!",
          error_message: error.message
      }); 
    }
}; 


// Delete Data, 
const DeleteUser = async(req,res)=>{
    try {
      const id = req.params.id; 
      const DeleteUser = await User.findByIdAndDelete({_id:id})
      res.send(DeleteUser);

    } catch (error) {
      res.status(404).send({
          operation: false,
          message: "userInformation Post Route not found!",
          error_message: error.message
      }); 
    }
}; 


module.exports = {getUserInformation, AddUserData,SearchUser,UpdateUser,DeleteUser}; 