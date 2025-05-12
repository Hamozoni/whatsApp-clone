import mongoose from "mongoose";

const STATUS_SCHEMA = new mongoose.Schema({
    user: {type: String, ref: 'User'},
    text: {type: String,require : false},
    file: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
    type: {type: String,enum: ['TEXT','MEDIA'],default: 'MEDIA'},
    text_bg_color: {type: String,require : false},
    seen_by: [{type: String, ref: 'User'}],
    who_can_see: {type: String,enum: ['ALL','EXCEPT',"SELECTED"],default: 'ALL'},
    selected_users : [{type: String, ref: 'User'}],
    excepted_users : [{type: String, ref: 'User'}],
    expires_at: {type: Date, require: true}
},{timestamps: true});

STATUS_SCHEMA.index({expires_at: 1},{ expireAfterSeconds: 0 })


const Status = mongoose.model('Status',STATUS_SCHEMA);

export default Status;