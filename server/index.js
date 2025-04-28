
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
    origin: ["http://localhost:3000","http://172.20.10.4:3000"],
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
    socket.to(chat_id).emit('user_connected',user_id);
  });

  socket.on('message_sent',(data) => {

    const socket_id = users_socket.get(data?.user);
    console.log(socket_id)
    socket.to(socket_id).emit('message_sent',data);
  });

  socket.on('call',({from,to,offer})=> {

    const callee = users_socket.get(to);
    socket.to(callee).emit('coming_call',{from});
  });

  socket.on('call_end',({to})=> {
    const callee = users_socket.get(to);
    socket.to(callee).emit('call_end');
  });

  socket.on('call_connected',({to})=> {
    const callee = users_socket.get(to);
    socket.to(callee).emit('call_connected');
  });

  

  socket.on('disconnect',()=> {
    users_socket.delete(user_id);
    console.log(users_socket);
  })

});
  
  
server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`);
});