const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors())  
app.use(express.json());


const server = app.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`)
});