import mongoose from "mongoose";


const CHANNEL_SCHEMA = new mongoose.Schema({
    admins : [{type: mongoose.Schema.Types.ObjectId,ref: 'User'}],
    followers : [{type: mongoose.Schema.Types.ObjectId,ref: 'User'}],
    name: {type: String, require: true},
    about: {type: String, require: true},
    messages: [{type: mongoose.Schema.Types.ObjectId,ref: 'Message'}],
    profile_picture: {type: String,require: true,default: '/channelAvatar.jpg'},

},{timestamps: true});


const Channel = mongoose.model('Channel',CHANNEL_SCHEMA);

export default Channel