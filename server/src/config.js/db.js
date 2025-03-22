import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect_db = async ()=> {
    try {
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch(error ){
        process.exit(1);

    }
};

export default connect_db;