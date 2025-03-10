import mongoose, { now } from 'mongoose';

const USER_SCHEMA = new mongoose.Schema({
    name: {type: String,require: true},
    email: {type: String,require: true},
    is_online: {type: Boolean, default: false },
    profile_picture: {type: String,require: false},
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    created_at: {type: Date, default: now()},
    updated_at: {type: Date, default: now()}
})