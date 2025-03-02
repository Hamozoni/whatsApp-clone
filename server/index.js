// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');

import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import  find_user  from "./controllers/auth_controller.js";
dotenv.config();

const server = express();

server.use(cors())  
server.use(express.json());
server.use('/api/auth',find_user);


server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`)
});