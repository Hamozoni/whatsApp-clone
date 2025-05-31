import mongoose from "mongoose";


const CHANNEL_SCHEMA = new mongoose.Schema({
    onner : {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    
})