import mongoose from "mongoose";

const CALL_SCHEMA = new mongoose.Schema({
    caller: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    callee: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    type : {type: String , enum: ['AUDIO','VEDIO'],default : 'AUDIO'},
    call_status: {type: String, enum: ['PENDING','ACCEPTED','REJECTED','ENDED'],default : 'PENDING'},
    duration: {type: Number},
},{timestamps: true});

const Call = mongoose.model('Call',CALL_SCHEMA);

export default Call;