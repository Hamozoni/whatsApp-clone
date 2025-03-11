import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect_db = async ()=> {
    try {
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected');
    } catch(error ){

        console.error('MongoDB connection error:', error);
        process.exit(1);

    }
};

export default connect_db;