import mongoose from "mongoose";

const CHAT_SCHEMA = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    contact: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    last_message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
  }, { timestamps: true});

  const Chat = mongoose.model('Chat',CHAT_SCHEMA);

  export default Chat;