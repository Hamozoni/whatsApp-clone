import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const post_chat_controller = async (req,res,next)=> {

    const {members,message} = req.body

    if(members?.length < 1) {
        return res.json({message: ' members are reqiure',status: false});
    }

    try {

      const chat = await Chat.create({members});

      const last_message = await Message.create({...message,chat_id:chat?._id});

      const updated_chat = await Chat.findByIdAndUpdate(chat?._id,{last_message},{new: true}).populate('members')

        return res.json({message: 'chat has been created',status: true,chat:updated_chat})

    }
    catch (error) {
        next(error)
    };

};

export const get_chat_unread_messages = async (req,res,next)=> {
    const {user_id,chat_id} = req.query;

    try {
        if(!user_id || !chat_id) {
            return res.status(401).json({message: 'sender id or chat id is missing'})
        };

        const unread_messages = await Message.countDocuments({chat_id,sender: {$ne: user_id},status: {$ne : 'READ'}});


        return res.status(200).json({message: 'unread messages found',unread_messages});
    }
    catch (error) {
        next(error?.message)
    }
}