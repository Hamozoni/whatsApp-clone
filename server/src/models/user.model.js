import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

const USER_SCHEMA = new mongoose.Schema({
    id: {type: String, require: true,unique: true, default: ()=> uuidv4()},
    name: {type: String,require: true},
    email: {type: String,require: true,unique: true},
    phone: {type: String,require: false},
    about: {type: String,require: false},
    email_verified:{type: Boolean, default: false },
    profile_picture: {type: String,require: true,default: '/placeholder_avatar.jpg'},
    picture_id: {type: String,require: false},
    password: {type: String,require: false},
    provider :{type: String,require: false},
    is_online: {type: Boolean,default: false},
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
},{timestamps: true});

 const User = mongoose.model('User',USER_SCHEMA);

 export default User;