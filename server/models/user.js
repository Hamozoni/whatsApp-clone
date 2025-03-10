import mongoose from 'mongoose';

const USER_SCHEMA = new mongoose.Schema({
    name: {type: String,require: true},
    email: { type: String, required: true, unique: true},
    phone_number: { type: String, unique: true},
    is_online: {type: Boolean, default: false },
    profile_picture: {type: String,require: false},
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    updated_at: {type: Date, default: Date.now},
    status: { type: String, default: 'Available' },
    last_seen: { type: Date, default: Date.now },
},{timestamps: true});

 const User = mongoose.model('User',USER_SCHEMA);

 export default User;