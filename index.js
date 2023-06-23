const express = require('express');
require('dotenv').config();
const cors =  require('cors');
console.log(process)

//create server app
const app = express();

// CORS
app.use(cors());

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