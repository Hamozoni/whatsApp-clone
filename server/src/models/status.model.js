import mongoose from "mongoose";

const STATUS_SCHEMA = new mongoose.Schema({
    user: {type: String, ref: 'User'},
    text: {type: String},
    file: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
    type: {type: String,enum: ['TEXT','MEDIA'],default: 'MEDIA'},
    expires_at: {type: Date, require: true}
},{timestamps: true});

STATUS_SCHEMA.index({expires_at: 1},{ expireAfterSeconds: 0 })


const Status = mongoose.model('Status',STATUS_SCHEMA);

export default Status;