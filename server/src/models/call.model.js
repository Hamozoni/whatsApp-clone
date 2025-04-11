import mongoose from "mongoose";

const CALL_SCHEMA = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    caller: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    callee: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    call_type : {type: String , enum: ['AUDIO','VEDIO']},
    call_status: {type: String, enum: ['PENDING','ACCEPTED','REJECTED','ENDED']},
},{timestamps: true});

const Call = mongoose.Model('Call',CALL_SCHEMA);

export default Call;