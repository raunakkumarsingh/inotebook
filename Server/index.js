const  connectToMongo =require('./db');
var cors=require('cors')
const express = require('express')
require('dotenv').config() 

connectToMongo(); 
const app = express()
const port = process.env.PORT || 4000;
app.use(express.json())
app.use(cors())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// }),

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})