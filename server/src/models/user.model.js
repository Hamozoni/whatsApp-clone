import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

const USER_SCHEMA = new mongoose.Schema({
    name: {type: String,require: true},
    email: {type: String,require: true,unique: true},
    phone: {type: String,require: false},
    about: {type: String,require: false,default:'Hey there! I am using WhatsApp.'},
    email_verified:{type: Boolean, default: false },
    profile_picture: {type: String,require: true,default: '/placeholder_avatar.jpg'},
    picture_id: {type: String,require: false},
    chats:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], 
    groups:[{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}], 
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    calls: [{type: mongoose.Schema.Types.ObjectId, ref: 'Call'}],
    status: [{type: mongoose.Schema.Types.ObjectId, ref: 'Status'}]
},{timestamps: true});

 const User = mongoose.model('User',USER_SCHEMA);

 export default User;