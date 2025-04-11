import mongoose from "mongoose";

const MEDIA_SCHEMA = new mongoose.Schema({
    type: {type: String,enum: ['AUDIO', 'PHOTO','VIDEO','DOCUMENT'],default: 'PHOTO'},
    url: {type: String ,require : true},
    public_id: {type: String ,require : true},
    message_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Message', require: true}
  }, { timestamps: true});

  const Media = mongoose.model('media',MEDIA_SCHEMA);

  export default Media;