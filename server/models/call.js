import mongoose from "mongoose";
import {v4 as uuid} from 'uuid';

const CALL_SCHEMA = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: uuid,
      },
    caller: { 
        id: {
          type: String,
          unique: true,
          default: uuid,
        },
        name: {type: String, require: true},
        email: {type: String, require: true,unique: true},
        profile_picture: {type: String, require: true}
      },
    callee: { 
        id: {
          type: String,
          unique: true,
          default: uuid,
        },
        name: {type: String, require: true},
        email: {type: String, require: true,unique: true},
        profile_picture: {type: String, require: true}
      },
    call_type : {type: String , enum: ['AUDIO','VEDIO']},
    call_status: {type: String, enum: ['PENDING','ACCEPTED','REJECTED','ENDED']},
    created_at : {type: Date, default: Date.now()},
    updated_at : {type: Date, default: Date.now()},
},{timestamps: false,_id: false});

const Call = mongoose.Model('Call',CALL_SCHEMA);

export default Call;