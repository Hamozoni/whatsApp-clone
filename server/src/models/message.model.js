import mongoose from "mongoose";

const MESSAGE_SCHEMA = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    media: [{ type: mongoose.Schema.Types.ObjectId,ref: 'Media' }],
    type: {type: String,enum: ['TEXT', 'MEDIA'],default: 'TEXT'},
    status: { 
        type: String, 
        enum: ['SENT', 'DELIVERED', 'READ'], 
        default: 'SENT' 
      },

},{timestamps: true});


const Message = mongoose.model('Message',MESSAGE_SCHEMA);

export default Message;