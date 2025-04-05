
import dotenv from "dotenv";
import http from 'http';
import app from "./src/app.js";
import { Server } from "socket.io";
import connect_db from "./src/config.js/db.js";


dotenv.config();
connect_db();

const server = http.createServer(app)


const socket_io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"], // If using auth headers
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
    socket_io.to(chat_id).emit('user_connected',user_id);
  });

  socket.on('send_message',(chat) => {
    socket_io.to(chat?._id).emit('message_sent',chat);
  });

  socket.on('message_received',message => {
    socket_io.to(message?.chat_id).emit('message_delivered',message);
  })

  socket.on('disconnect',()=> {
    users_socket.delete(user_id);
    console.log(users_socket);
  })

});
  
  
server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`);
});