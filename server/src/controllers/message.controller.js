
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js"


export const post_message_controller = async (req,res,next) => {
    
    
    try {
        const {chat_id,sender,contact,text,media,type,status} = req.body;

        if(!sender || !contact) {
            return res.status(500).json({message: 'sender id is reqiure'});
        };

        const message = await Message.create({sender,text,media,contact,type,status});

        const contact_chat_id = await Chat.findOne({user: contact,contact:sender});
        const sender_chat_id = await Chat.findOne({user: sender,contact:contact});

        let sender_chat = null;
        let contact_chat = null

        if(sender_chat_id) {
             sender_chat = await Chat.findByIdAndUpdate(sender_chat_id?._id,
                {last_message: message?._id, $addToSet :{messages: message?._id}},{new: true}
           ).populate('last_message').exec();

        }else {
             sender_chat = await Chat.create({user: sender,contact,last_message: message?._id,messages: message?._id})
        }

        if(contact_chat_id) {
             contact_chat = await Chat.findByIdAndUpdate(contact_chat_id?._id,
                {last_message: message?._id, $addToSet :{messages: message?._id}},{new: true}
           ).populate('last_message').exec();
        }else {
            contact_chat = await Chat.create({user: contact,contact: sender,last_message: message?._id,messages: message?._id})
        };

        return res.status(200).json({contact_chat,sender_chat})

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
        return res.status(404).json({message:'chat id and receiver id are required'})
    }

    try{

        if(status === 'DELIVERED') {
            await Message.updateMany({chat_id,sender,status: 'SENT'},{status});
            return res.status(200).json({message: 'messages updated ',status})
        }else {
            await Message.updateMany({chat_id,sender, status: 'DELIVERED'},{status}); 
            return res.status(200).json({message: 'messages updated ',status})
        }
    }
    catch(error) {
        next(error);
    }
}