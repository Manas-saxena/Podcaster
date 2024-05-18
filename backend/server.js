require('dotenv').config()
const express = require('express');
const router = require('./routes')
const app = express();
const DBconnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser')


const corsOptions={
    origin:['http://localhost:3000'],
    credentials:true
}
app.use('/storage',express.static('storage'))
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
DBconnect()
app.use(express.json({
    limit:'50mb'
}))
app.use(router);


const PORT = process.env.PORT || 5500; 
app.listen(PORT,()=>{
    console.log('Listening on port 5500');
})