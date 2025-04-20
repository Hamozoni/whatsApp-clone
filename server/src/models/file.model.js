import mongoose from "mongoose";

const FILE_SCHEMA = new mongoose.Schema({
    name : {type: String,require:true},
    type: {type: String,enum: ['AUDIO', 'IMAGE','VIDEO','APPLICATION'],default: 'IMAGE'},
    url: {type: String ,require : true},
    public_id: {type: String ,require : true},
    size: {type : Number , require: true},
  }, { timestamps: true});

  const File = mongoose.model('File',FILE_SCHEMA);

  export default File;