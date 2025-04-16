
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../config.js/cloudinary.js";
import File from "../models/file.model.js";
import streamifier from "streamifier";

export const post_message_controller = async (req,res,next) => {

    let sender_chat = null;
    let contact_chat = null;
    let file_result = null

    const populate = [
        {
            path: 'last_message',
            select: 'file createdAt sender status text type _id'
        },
        {
            path: 'contact',
            select: 'name _id about profile_picture',
        }
    ];

    
    
    try {
        const {sender,contact,text,type,status,replay_to} = req.body;
        
        if(!sender || !contact) {
            return res.status(500).json({message: 'sender id is reqiure'});
        };


        if(type === 'MEDIA' && req.file) {

            const resource_type = req.file.mimetype;
            
            const cloudinary_result = cloudinary.uploader.upload_stream(
                {folder: `message/${resource_type.split('/')[0]}`},
                (error,result)=>{
                    if (error) {
                        console.error('Cloudinary Error:', error);
                        return res.status(500).json({ error: 'Cloudinary upload failed' });
                      };

                      file_result = new File({
                          type: resource_type.split('/')[0],
                          url: result.source_url,
                          public_id: result.public_id,
                          size: req.file.size
                      });

                      file_result.save();
                });

                streamifier.createReadStream(req.file.buffer).pipe(cloudinary_result)

        }



        const message = await Message.create({sender,text,contact,type,status,replay_to,file: file_result?._id});

        const contact_chat_id = await Chat.findOne({user: contact,contact:sender});
        const sender_chat_id = await Chat.findOne({user: sender,contact:contact});

        if(sender_chat_id) {
             sender_chat = await Chat.findByIdAndUpdate(sender_chat_id?._id,
                {last_message: message?._id, $addToSet :{messages: message?._id}},{new: true}
                ).populate(populate)
                .select('-messages')

        }else {
           const chat = await Chat.create({user: sender,contact,last_message: message?._id,messages: message?._id});
            sender_chat  = await Chat.findById(chat?._id,{new: true})
            .populate(populate)
                .select('-messages')

        }

        if(contact_chat_id) {
             contact_chat = await Chat.findByIdAndUpdate(contact_chat_id?._id,
                {last_message: message?._id, $addToSet :{messages: message?._id}},{new: true}
           ).populate(populate)
           .select('-messages')
        }else {
           const chat = await Chat.create({user: contact,contact: sender,last_message: message?._id,messages: message?._id});
            contact_chat = await Chat.findById(chat?._id,{new: true})
            .populate(populate)
           .select('-messages')
        };

        return res.status(200).json({contact_chat,sender_chat})

    }
    catch (error) {
        console.log(error)
        next(error)
    }
    
} 

export const get_message_controller = async (req,res,next) => {

    const {chat_id} = req.query;

    if(!chat_id) {
        return res.status(400).json({message: 'chat id is reqiure'})
    }

    try {
        const messages = await Chat.findById(chat_id).populate('messages')
        return res.status(200).json({messages: messages?.messages})
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