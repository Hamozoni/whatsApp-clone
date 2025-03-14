import mongoose from 'mongoose';

const USER_SCHEMA = new mongoose.Schema({
    name: {type: String,require: true},
    email: {type: String,require: true,unique: true},
    phone: {type: String,require: false},
    about: {type: String,require: false},
    email_verified:{type: Boolean, default: false },
    is_online: {type: Boolean, default: false },
    profile_picture: {type: String,require: false},
    picture_id: {type: String,require: false},
    password: {type: String,require: false},
    provider :{type: String,require: false},
},{timestamps: true});

 const User = mongoose.model('User',USER_SCHEMA);

 export default User;