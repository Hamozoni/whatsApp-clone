import mongoose from "mongoose";

const MESSAGE_SCHEMA = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

const Message = mongoose.model('Message',MESSAGE_SCHEMA);

export default Message;