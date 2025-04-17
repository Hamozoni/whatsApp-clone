import mongoose from "mongoose";

const FILE_SCHEMA = new mongoose.Schema({
    type: {type: String,enum: ['AUDIO', 'PHOTO','VIDEO','DOCUMENT'],default: 'PHOTO'},
    url: {type: String ,require : true},
    public_id: {type: String ,require : true},
    size: {type : Number , require: true},
  }, { timestamps: true});

  const File = mongoose.model('File',FILE_SCHEMA);

  export default File;