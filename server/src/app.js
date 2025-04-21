import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

app.use(express.json()); 
app.use(cors({
  origin: ["http://localhost:3000","http://172.20.10.4:3000"], // Replace with your Next.js app's origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Enable if using cookies/auth
}));

app.use('/api',routes);


export default app;