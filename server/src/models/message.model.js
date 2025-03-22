import mongoose from "mongoose";

const MESSAGE_SCHEMA = new mongoose.Schema({
    chat_id: {type: mongoose.Schema.Types.ObjectId, ref: "Chat"},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    media: { type: String },
    type: {type: String,enum: ['TEXT', 'AUDIO', 'PHOTO','VIDEO','DOCUMENT','VIDEO_CALL','AUDIO_CALL'], 
        default: 'TEXT'},
    status: { 
        type: String, 
        enum: ['SENT', 'DELIVERED', 'READ'], 
        default: 'SENT' 
      },

},{timestamps: true});


const Message = mongoose.model('Message',MESSAGE_SCHEMA);

export default Message;