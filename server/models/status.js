import mongoose from "mongoose";
import {v4 as uuid} from 'uuid';

const STATUS_SCHEMA = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: uuid,
    },
    text: {type: String},
    media: {type: String},
    user: { 
        id: {
          type: String,
          unique: true,
          default: uuid,
        },
        name: {type: String, require: true},
        email: {type: String, require: true,unique: true},
        profile_picture: {type: String, require: true}
    },
    type: {type: String,enum: ['TEXT','PHOTO','VIDEO'], 
        default: 'PHOTO'
    },
    created_at : {type: Date, default: Date.now()},
    updated_at : {type: Date, default: Date.now()},
    expires_at: {type: Date, require: true}
},{timestamps: false});

STATUS_SCHEMA.index({expires_at: 1},{ expireAfterSeconds: 0 });


const Status = mongoose.model('Status',STATUS_SCHEMA);

export default Status;