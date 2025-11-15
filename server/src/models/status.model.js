import mongoose from "mongoose";

const STATUS_SCHEMA = new mongoose.Schema({
    onwer: {type: String, ref: 'User'},
    text: {type: String,require : false},
    file: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},
    type: {type: String,enum: ['TEXT','MEDIA'],default: 'TEXT'},
    textBgColor: {type: String,require : false},
    fontFamily: {type: String,require : false},
    seenBy: [{type: String, ref: 'User'}],
    whoCanSee: {type: String,enum: ['ALL','EXCEPT',"SELECTED"],default: 'ALL'},
    selectedUsers : [{type: String, ref: 'User'}],
    exceptedUsers : [{type: String, ref: 'User'}],
},{timestamps: true});


const Status = mongoose.model('Status',STATUS_SCHEMA);

export default Status;