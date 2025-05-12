import mongoose from "mongoose";

const STATUS_SCHEMA = new mongoose.Schema({
    user: {type: String, ref: 'User'},
    text: {type: String,require : false},
    file: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
    type: {type: String,enum: ['TEXT','MEDIA'],default: 'TEXT'},
    text_bg_color: {type: String,require : false},
    font_family: {type: String,require : false},
    seen_by: [{type: String, ref: 'User'}],
    who_can_see: {type: String,enum: ['ALL','EXCEPT',"SELECTED"],default: 'ALL'},
    selected_users : [{type: String, ref: 'User'}],
    excepted_users : [{type: String, ref: 'User'}],
},{timestamps: true});


const Status = mongoose.model('Status',STATUS_SCHEMA);

export default Status;