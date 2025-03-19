
import { v4 as uuid } from "uuid";
import mongoose from "mongoose";

const CHAT_SCHEMA = new mongoose.Schema({
    id: {
          type: String,
          unique: true,
          default: uuid,
    },
    members: [{ 
      id: {
        type: String,
        unique: true,
        default: uuid,
      },
      is_online: {type: Boolean, default: false },
      name: {type: String, require: true},
      email: {type: String, require: true,unique: true},
      profile_picture: {type: String, require: true}
    }],
    is_group: { type: Boolean, default: false },
    group_name: String,
    group_admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    last_message:[{
      sender: {_id : {type: String, require: true},name: {type: String, require: true}},
      text: { type: String },
      media: { type: String },
      type: {type: String,enum: ['TEXT', 'AUDIO', 'PHOTO','VIDEO','DOCUMENT','VIDEO_CALL','AUDIO_CALL'], 
          default: 'TEXT'},
      created_at : {type: Date, default: Date.now()},
      updated_at : {type: Date, default: Date.now()},
      status: { 
        type: String, 
        enum: ['SENT', 'DELIVERED', 'READ'], 
        default: 'SENT' 
      },
    }],
    created_at : {type: Date, default: Date.now()},
    updated_at : {type: Date, default: Date.now()},

  }, { timestamps: false});

  const Chat = mongoose.model('Chat',CHAT_SCHEMA);

  export default Chat;