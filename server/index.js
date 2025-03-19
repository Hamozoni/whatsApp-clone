import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from 'http'
import { Server } from "socket.io";

import  auth_route  from "./routes/auth_route.js";
import chats_contacts_route from "./routes/chats_contacts_route.js";
import create_user_route from './routes/create_user_route.js';
import create_contact_route from "./routes/create_contact_route.js"
import connect_db from "./lib/database.js";


dotenv.config();

connect_db();

const app = express();
const server = http.createServer(app)

app.use(cors({
    origin: "http://localhost:3000", // Replace with your Next.js app's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable if using cookies/auth
  }));


const socket_io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"], // If using auth headers
    credentials: true // Only needed if using cookies/auth
  }
});
  
  
app.use(express.json());

app.use('/api/auth',auth_route);
app.use('/api',chats_contacts_route);
app.use('/api',create_user_route);
app.use('/api',create_contact_route);


server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`);
});