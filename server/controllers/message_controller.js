
import Chat from "../models/chat.js";
import Message from "../models/message.js"


export const post_message_controller = async (req,res,next) => {
    
    const {chat_id,sender,text,media,type,status} = req.body;

    if(!sender) {
        return res.json({message: 'sender id is reqiure',status: false});
    }
    
    if(chat_id) {


        const message = await Message.create({chat_id,sender,text,media,type,status});



        const last_message = await Chat.findByIdAndUpdate(chat_id,{
            $addToSet :{last_message: message?._id }
        });


    }else {

        const chat = await Chat.create()
        const message = await Message.create({chat_id,sender,text,media,type,status});

        const last_message = await Chat.findByIdAndUpdate(chat_id,{
            $addToSet :{last_message: message?._id }
        });
    }
} 