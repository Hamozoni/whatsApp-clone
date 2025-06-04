import mongoose from "mongoose";


const CHANNEL_SCHEMA = new mongoose.Schema({
    admins : [{type: mongoose.Schema.Types.ObjectId,ref: 'User'}],
    followers : [{type: mongoose.Schema.Types.ObjectId,ref: 'User'}],
    name: {type: String, require: true},
    description: {type: String, require: true},
    messages: [{type: mongoose.Schema.Types.ObjectId,ref: 'Message'}],
    profile_picture: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},

},{timestamps: true});


const Channel = mongoose.model('Channel',CHANNEL_SCHEMA);

export default Channel