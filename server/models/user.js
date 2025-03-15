import mongoose from 'mongoose';
import {v4 as uuid} from 'uuid';

const USER_SCHEMA = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: uuid,
    },
    name: {type: String,require: true},
    email: {type: String,require: true,unique: true},
    phone: {type: String,require: false},
    about: {type: String,require: false},
    email_verified:{type: Boolean, default: false },
    profile_picture: {type: String,require: false},
    picture_id: {type: String,require: false},
    password: {type: String,require: false},
    provider :{type: String,require: false},
    created_at : {type: Date, default: Date.now()},
    updated_at : {type: Date, default: Date.now()},
},{timestamps: false});

 const User = mongoose.model('User',USER_SCHEMA);

 export default User;