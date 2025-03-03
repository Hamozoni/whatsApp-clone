// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');

import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import  auth_route  from "./routes/auth_route.js";

dotenv.config();

const server = express();

server.use(cors())  
server.use(express.json());

server.use('/api/auth',auth_route);
server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`)
});