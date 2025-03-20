import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from 'http';

import { Server } from "socket.io";

import connect_db from "./lib/database.js";
import user_router from "./routes/user_route.js";
import contact_route from "./routes/contact_route.js"
import message_route from "./routes/message_route.js"


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
  
  app.use('/api',user_router);
  app.use('/api',contact_route);
  app.use('/api',message_route);

  socket_io.on('connection',socket => {
    console.log('User connected:', socket.id);
  })
  
  
server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`);
});