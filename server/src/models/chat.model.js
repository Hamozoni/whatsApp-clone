import mongoose from "mongoose";

const CHAT_SCHEMA = new mongoose.Schema({
    participants: [{type: String}], 
    lastMssage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    deleetedFor: [{type: String}],
    isGroup: {type : Boolean, default : false}
  }, { timestamps: true});

  const Chat = mongoose.model('Chat',CHAT_SCHEMA);

  export default Chat;