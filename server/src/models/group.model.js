import mongoose from "mongoose";

const GROUP_SCHEMA = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    group_name: String,
    group_admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    last_message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    messages: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },

  }, { timestamps: true});

  const Group = mongoose.model('Group',GROUP_SCHEMA);

  export default Group;