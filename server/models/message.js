import mongoose from "mongoose";
import {v4 as uuid} from 'uuid';

const MESSAGE_SCHEMA = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: uuid,
    },
    chat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    sender: { 
        id: {
          type: String,
          unique: true,
          default: uuid,
        },
        name: {type: String, require: true},
        email: {type: String, require: true,unique: true},
        profile_picture: {type: String, require: true}
    },
    text: { type: String },
    media: { type: String },
    type: {type: String,enum: ['TEXT', 'AUDIO', 'PHOTO','VIDEO','DOCUMENT','VIDEO_CALL','AUDIO_CALL'], 
        default: 'TEXT'},
    status: { 
        type: String, 
        enum: ['SENT', 'DELIVERED', 'READ'], 
        default: 'SENT' 
      },
    created_at : {type: Date, default: Date.now()},
    updated_at : {type: Date, default: Date.now()},

},{timestamps: false});

const Message = mongoose.model('Message',MESSAGE_SCHEMA);

export default Message;