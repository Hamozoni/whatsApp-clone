const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
import user_auth_router from "./routes/auth_route";

dotenv.config();

const server = express();

server.use(cors())  
server.use(express.json());
server.use('/api/auth',user_auth_router);


server.listen(process.env.PORT,()=> {
    console.log(`server is listening to port ${process.env.PORT}`)
});