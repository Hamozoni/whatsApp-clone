import mongoose from 'mongoose';

const USER_SCHEMA = new mongoose.Schema({
    name: {type: String,require: true},
    email: {type: String,require: true},
    is_online: {type: Boolean, default: false },
    profile_picture: {type: String,require: false},
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
},{timestamps: true});

 const User = mongoose.model('User',USER_SCHEMA);

 export default User;