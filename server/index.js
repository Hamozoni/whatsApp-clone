import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import  auth_route  from "./routes/auth_route.js";
import connect_db from "./lib/database.js";

dotenv.config();

connect_db();

const server = express();

server.use(cors({
    origin: "http://localhost:3000", // Replace with your Next.js app's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable if using cookies/auth
  }))  
server.use(express.json());

server.use('/api/auth',auth_route);


server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`)
});