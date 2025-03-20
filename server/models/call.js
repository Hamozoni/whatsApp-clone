import mongoose from "mongoose";
import {v4 as uuid} from 'uuid';

const CALL_SCHEMA = new mongoose.Schema({
    // _id: {type: String,require: true,default:()=> uuid(),
    //     validate: {
    //     validator: (v) => validator.isUUID(v),
    //     message: props => `${props.value} is not a valid UUID!`
    //   }
    // },
    caller: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    callee: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    call_type : {type: String , enum: ['AUDIO','VEDIO']},
    call_status: {type: String, enum: ['PENDING','ACCEPTED','REJECTED','ENDED']},
},{timestamps: true});

const Call = mongoose.Model('Call',CALL_SCHEMA);

export default Call;