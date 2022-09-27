require("dotenv").config({ path : __dirname + '/config.env'}); 
const express = require('express')
const app = express();
const cors = require('cors');


const path = require('path');
const PORT = process.env.PORT 

const user = require('./routes/userroutes');
const product = require('./routes/productrouter');

 app.use(cors())


app.use('/user',user); 
app.use('/product',product); 

const buf = Buffer.from('Hey!');
buf[1] = 111; // o in UTF-8
console.log(buf.toString());


app.get('/',(req,res)=>{ 
 
    res.sendFile(path.join(__dirname,'/hello.html'));
   

})

app.listen(PORT,()=>{
    console.log("App working on Port" + PORT);
});


  