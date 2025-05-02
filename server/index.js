
import dotenv from "dotenv";
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import app from "./src/app.js";
import { Server } from "socket.io";
import connect_db from "./src/config.js/db.js";



dotenv.config();
connect_db();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read SSL files

// HTTPS Configuration
const credentials = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};


const server = https.createServer(credentials,app);

const socket_io = new Server(server,{
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    // allowedHeaders: ["Authorization"],
    extraHeaders: {
      "Access-Control-Allow-Origin": "*"
    }, // If using auth headers
    credentials: true // Only needed if using cookies/auth
  }
});

// app.set('io', socket_io);

const users_socket = new Map();

socket_io.on('connection',socket => {

  const {user_id} = socket.handshake.query;
  users_socket.set(user_id,socket.id);
  console.log(users_socket);

  socket.on('join_room',(chat_id)=> {
    socket.join(chat_id);
    socket.to(chat_id).emit('user_connected',user_id);
  });

  socket.on('message_sent',(data) => {

    const socket_id = users_socket.get(data?.user);
    console.log(socket_id)
    socket.to(socket_id).emit('message_sent',data);
  });

  socket.on('call',({from,to,type})=> {
    const callee = users_socket.get(to);
    socket.to(callee).emit('call',{from,type});
  });

  socket.on('offer',({to,data})=> {
    const callee = users_socket.get(to);
    socket.to(callee).emit('offer',{data});
  });
  socket.on('call_received',({to})=> {
    const callee = users_socket.get(to);
    socket.to(callee).emit('call_received');
  });

  socket.on('answer',({to,data})=> {
    const callee = users_socket.get(to);
    socket.to(callee).emit('answer',{data});
  });

  socket.on('ice_candidate',({to,data})=> {
    const callee = users_socket.get(to);
    socket.to(callee).emit('ice_candidate',{data});
  });

  socket.on('call_end',({to})=> {
    const callee = users_socket.get(to);
    socket.to(callee).emit('call_end');
  });


  

  socket.on('disconnect',()=> {
    users_socket.delete(user_id);
  })

});
  
  
server.listen(process.env.PORT,'0.0.0.0',()=> {
    console.log(`server is listening to port ${process.env.PORT}`);
});