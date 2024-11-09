const app = require('./app'); 
const config = require('./Config/config.js');
const connection  = require('./Config/DB.js'); 

const PORT = config.app.port || 3001; 


app.listen(PORT,()=>{
    console.log(`Visit Server Link : http://localhost:${PORT}`); 
    connection(); 
}); 