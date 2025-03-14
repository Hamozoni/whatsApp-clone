

import mongoose from "mongoose";

const CHAT_SCHEMA = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    is_group: { type: Boolean, default: false },
    group_name: String,
    group_admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    type: {type: String,enum: ['TEXT','PHOTO','VIDEO'], 
      default: 'TEXT'},
  }, { timestamps: true });

  const Chat = mongoose.model('Chat',CHAT_SCHEMA);

  export default Chat;