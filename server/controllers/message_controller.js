
import Chat from "../models/chat.js";
import Message from "../models/message.js"
import User from "../models/user.js";


export const post_message_controller = async (req,res,next) => {
    
    const {receiver,chat_id,sender,text,media,type,status} = req.body;

    if(!sender) {
        return res.json({message: 'sender id is reqiure',status: false});
    }

    try {
        if(chat_id) {
    
            const message = await Message.create({chat_id,sender,text,media,type,status});
            const last_message = await Chat.findByIdAndUpdate(chat_id,{
                $addToSet :{last_message: message?._id }
            }).populate('last_message').exec();
    
            return res.json({message: 'message has been sent',status: true,last_message})
    
    
        }else {
    
            const chat = await Chat.create({members:[sender,receiver]})
    
            const message = await Message.create({chat_id:chat?._id,sender,text,media,type,status})
    
            const last_message = await Chat.findByIdAndUpdate(chat?._id,{
                $addToSet :{last_message: message?._id }
            }).populate('last_message').exec();
    
    
            return res.json({message: 'message has been sent',status: true,last_message})
        }

    }
    catch (error) {
        next(error)
    }
    
} 