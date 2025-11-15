import mongoose from "mongoose";

const CHAT_SCHEMA = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], 
    lastMssage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    deleetedFor: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  }, { timestamps: true});

  const Chat = mongoose.model('Chat',CHAT_SCHEMA);

  export default Chat;