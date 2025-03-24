
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



socket_io.on('connection',socket => {

  console.log('user id'+socket?.id)

  socket.on('join_room',(chat_id)=> {
    console.log('chat id'+chat_id)
    socket.join(chat_id)

  });

  socket.on('send_message',(message)=> {
    socket_io.to(message?.chat_id).emit('receive_message',message)
  });

  socket.on('message_read',id=> {
    console.log('message_id ' + id)
  })

})
  
  
server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`);
});