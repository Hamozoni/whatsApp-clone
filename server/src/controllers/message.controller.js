
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js"


export const post_message_controller = async (req,res,next) => {
    
    const {receiver,chat_id,sender,text,media,type,status} = req.body

    if(!sender) {
        return res.json({message: 'sender id is reqiure',status: false});
    }

    try {
        if(chat_id) {
    
            const message = await Message.create({chat_id,sender,text,media,type,status});

            await Chat.findByIdAndUpdate(chat_id,
                 {last_message: message?._id}
            ).populate('last_message').exec();
    
            return res.json({message: 'message has been sent',status: true,message})
    
    
        }else {
            
            
            const chat = await Chat.create({members:[sender,receiver]})
            
            const message = await Message.create({chat_id:chat?._id,sender,text,media,type,status})
    
            const last_message = await Chat.findByIdAndUpdate(chat?._id,{
            last_message: message?._id 
            }).populate('last_message').exec();
    
    
            return res.json({message: 'message has been sent',status: true,last_message})
        }

    }
    catch (error) {
        next(error)
    }
    
} 

export const get_message_controller = async (req,res,next) => {

    const {chat_id} = req.query;

    if(!chat_id) {
        return res.json({message: 'chat id is reqiure',status: false})
    }

    try {

        const messages = await Message.find({chat_id});
        return res.json({messages: 'chat messages',status: true,messages})
    }
    catch(error) {
        next(error)
    }

}

export const put_message_status_controller = async (req,res,next)=> {

    const {chat_id,receiver,status}  = req.body;

    if(!chat_id || !receiver) {
        return res.json({message:'chat id and receiver id are required',status: false})
    }

    try{
        await Message.updateMany({chat_id,sender:{$ne: receiver}},{status});
        return res.json({message: 'messages updated ',status: true})
    }
    catch(error) {
        next(error);
    }
}