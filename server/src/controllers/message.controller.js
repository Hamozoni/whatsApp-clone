
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js"


export const post_message_controller = async (req,res,next) => {
    
    const {chat_id,sender,text,media,type,status} = req.body

    if(!sender || !chat_id) {
        return res.json({message: 'sender id is reqiure',status: false});
    }

    try {
        const message = await Message.create({chat_id,sender,text,media,type,status});

      const chat =  await Chat.findByIdAndUpdate(chat_id,
             {last_message: message?._id},{new: true}
        ).populate('last_message').exec();

        return res.json({message: 'message has been sent',status: true,chat})

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

    const {chat_id,sender,status}  = req.body;

    if(!chat_id || !sender) {
        return res.json({message:'chat id and receiver id are required',status: false})
    }

    try{

        if(status === 'DELIVERED') {
            await Message.updateMany({chat_id,sender,status: 'SENT'},{status});
        }else {
            await Message.updateMany({chat_id,sender, status: 'DELIVERED'},{status}); 
        }
        return res.json({message: 'messages updated ',status: true})
    }
    catch(error) {
        next(error);
    }
}