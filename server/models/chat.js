

import mongoose from "mongoose";

const CHAT_SCHEMA = new mongoose.Schema({
    members: [{ 
      _id : {type: String, require: true},
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
      timestamp : {type: Date, default: Date.now()}
    }] 
  }, { timestamps: true });

  const Chat = mongoose.model('Chat',CHAT_SCHEMA);

  export default Chat;