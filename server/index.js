
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

  socket.on('join_room',(chat_id)=> {
    socket.join(chat_id)

  });

  socket.on('send_message',chat=> {
    console.log(chat?._id)
    socket_io.to(chat?._id).emit('message_sent',chat);
  });


  socket.on('messag_read',(data)=>  {
    socket_io.to(data?.chat_id).emit('message_seen',data?.messages)
  });

  socket.on('message_delivered',(data)=>  {
    socket_io.to(data?.chat_id).emit('message_arived',data?.messages)
  })

})
  
  
server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`);
});