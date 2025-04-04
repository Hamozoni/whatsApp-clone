import mongoose from "mongoose";
// import {v4 as uuid} from 'uuid';

const STATUS_SCHEMA = new mongoose.Schema({
    text: {type: String},
    media: {type: String},
    aother: {type: String, ref: 'User'},
    type: {type: String,enum: ['TEXT','PHOTO','VIDEO'], 
        default: 'PHOTO'
    },
    expires_at: {type: Date, require: true}
},{timestamps: true});

STATUS_SCHEMA.index({expires_at: 1},{ expireAfterSeconds: 0 })


const Status = mongoose.model('Status',STATUS_SCHEMA);

export default Status;