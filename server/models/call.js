import mongoose from "mongoose";
import {v4 as uuid} from 'uuid';

const CALL_SCHEMA = new mongoose.Schema({
    _id: {type: String,require: true,default:uuid},
    caller: {type : String, ref: "User"},
    callee: {type : String, ref: "User"},
    call_type : {type: String , enum: ['AUDIO','VEDIO']},
    call_status: {type: String, enum: ['PENDING','ACCEPTED','REJECTED','ENDED']},
},{timestamps: true});

const Call = mongoose.Model('Call',CALL_SCHEMA);

export default Call;