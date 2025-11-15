import mongoose from 'mongoose';

const USER_SCHEMA = new mongoose.Schema({
    displayName: {type: String,require: true},
    email: {type: String,require: true,unique: true},
    about: {type: String,require: false,default:'Hey there! I am using WhatsApp.'},
    emailVerified:{type: Boolean, default: false },
    photoURL: {type: String,require: true,default: '/placeholder_avatar.jpg'},
    photoURLId: {type: String,require: false},
    firebaseUid: {type: String,require: true,unique: true},
    lastLoginAt: {type: Date,require: true,default: Date.now()},
},{timestamps: true});

 const User = mongoose.model('User',USER_SCHEMA);

 export default User;