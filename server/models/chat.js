
import { v4 as uuid } from "uuid";
import mongoose from "mongoose";

const CHAT_SCHEMA = new mongoose.Schema({
    _id: {type: String,require: true,default:uuid},
    members: [{type: String, ref: 'User'}],
    is_group: { type: Boolean, default: false },
    group_name: String,
    group_admin: {type: String, ref: 'User' },
    last_message: { type: String, ref: 'Message' },
    messages: [{ type: String, ref: 'Message' }]

  }, { timestamps: true});

  const Chat = mongoose.model('Chat',CHAT_SCHEMA);

  export default Chat;