
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

const CHAT_SCHEMA = new mongoose.Schema({
    id: {
      type: String,
      default: () => uuidv4(),
      required: true
    },
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    is_group: { type: Boolean, default: false },
    group_name: String,
    group_admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    last_message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },

  }, { timestamps: true});

  const Chat = mongoose.model('Chat',CHAT_SCHEMA);

  export default Chat;