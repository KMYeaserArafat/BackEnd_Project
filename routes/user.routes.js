const express = require('express'); 
const {getUserInformation,AddUserData, SearchUser,UpdateUser, DeleteUser} = require('../controller/user.Controller');
const router = express.Router(); 


router.get('/userInformation', getUserInformation); 
router.get('/userInformation/:id',SearchUser); 
router.post('/userInformation', AddUserData);
router.patch('/userInformation/:id',UpdateUser); 
router.delete('/userInformation/:id',DeleteUser)



module.exports = router; 