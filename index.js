const express = require('express');
require('dotenv').config();

console.log(process)

//create server app
const app = express();
//database

//lectura y parseo body
app.use(express.json());

//routes
app.use('/api/auth',require('./routes/auth'));

//public directory
// app.use( express.static('public') );


//listen
app.listen( process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})