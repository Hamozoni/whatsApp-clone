
import { Schema, model } from "mongoose";

const NOTIFICATION_SCHEMA = new Schema({
    user_email: {type: String, require: true, uninque: true},
    unreaded_messages: [{type: Schema.Types.ObjectId,ref: 'Message'}],
    missed_calls: [{type: Schema.Types.ObjectId,ref: 'Call'}]
},{timestamps: true});


const Notification = model('Notification',NOTIFICATION_SCHEMA);


export default Notification;