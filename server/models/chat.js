
import { v4 as uuid } from "uuid";
import mongoose from "mongoose";

const CHAT_SCHEMA = new mongoose.Schema({
//   _id: {type: String,require: true,default:()=> uuid(),
//     validate: {
//     validator: (v) => validator.isUUID(v),
//     message: props => `${props.value} is not a valid UUID!`
//   }
// },
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    is_group: { type: Boolean, default: false },
    group_name: String,
    group_admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    last_message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]

  }, { timestamps: true});

  const Chat = mongoose.model('Chat',CHAT_SCHEMA);

  export default Chat;