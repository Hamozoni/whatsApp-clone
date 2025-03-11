import mongoose from "mongoose";

const STATUS_SCHEMA = new mongoose.Schema({
    content: {type: String, require: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: {type: String,enum: ['TEXT','PHOTO','VIDEO'], 
        default: 'PHOTO'},
    expires_at: {type: Date, require: true}
},{timestamps: true});

STATUS_SCHEMA.index({expires_at: 1},{ expireAfterSeconds: 0 });


const Status = mongoose.model('Status',STATUS_SCHEMA);

export default Status;