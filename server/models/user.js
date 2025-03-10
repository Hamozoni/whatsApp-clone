import mongoose, { now } from 'mongoose';

const USER_SCHEMA = new mongoose.Schema({
    name: {type: String,require: true},
    email: {type: String,require: true},
    is_online: {type: Boolean, default: false },
    profile_picture: {type: String,require: false},
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    updated_at: {type: Date, default: Date.now}
},{timestamps: true});

export const User = mongoose.model('User'.USER_SCHEMA);