import mongoose from "mongoose";

const MESSAGE_SCHEMA = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    file: { type: mongoose.Schema.Types.ObjectId,ref: 'File' },
    call:  { type: mongoose.Schema.Types.ObjectId,ref: 'Call'},
    type: {type: String,enum: ['TEXT', 'MEDIA','CALL'],default: 'TEXT'},
    status: { 
        type: String, 
        enum: ['SENT', 'DELIVERED', 'READ'], 
        default: 'SENT' 
      },
    reply_to: {type: mongoose.Schema.Types.ObjectId, ref: 'Message', require: false},
},{timestamps: true});


const Message = mongoose.model('Message',MESSAGE_SCHEMA);

export default Message;