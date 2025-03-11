import mongoose from "mongoose";

const CALL_SCHEMA = new mongoose.Schema({
    caller: {type: mongoose.Schema.Types.ObjectId, ref: 'User',require: true},
    callee: {type: mongoose.Schema.Types.ObjectId, ref: 'User',require: true},
    call_type : {type: String , enum: ['AUDIO','VEDIO']},
    call_status: {type: String, enum: ['PENDING','ACCEPTED','REJECTED','ENDED']}
},{timestamps: true});

const Call = mongoose.Model('Call',CALL_SCHEMA);

export default Call;