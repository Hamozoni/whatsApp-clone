import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const post_chat_controller = async (req,res,next)=> {

    const {members,message} = req.body

    if(members?.length < 1) {
        return res.json({message: ' members aer reqiure',status: false});
    }

    try {

      const chat = await Chat.create({members});

      const last_message = await Message.create({...message,chat_id:chat?._id});

      const updated_chat = await Chat.findByIdAndUpdate(chat?._id,{last_message},{new: true}).populate('members')

        return res.json({message: 'chat has been created',status: true,chat:updated_chat})

    }
    catch (error) {
        next(error)
    }





}