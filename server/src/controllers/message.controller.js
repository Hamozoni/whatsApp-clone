
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../config.js/cloudinary.js";
import { upload_file } from "../utils/upload_file.js";

export const post_message_controller = async (req,res,next) => {

    let sender_chat = null;
    let contact_chat = null;
    let message = null;
    let file_result = null

    const call_populate = [
        {
            path: 'callee',
            select: 'name _id about profile_picture',

        },
        {
            path: 'caller',
            select: 'name _id about profile_picture',
        },
    ]

    const populate = [
        {
            path: 'last_message',
            populate :[{
                path: 'file',
                select: 'url _id type name size'
            },
            {
                path: 'call',
                populate : call_populate
            },
             {
                path: 'reply_to',
                populate: {
                    path: 'file',
                    elect: 'url _id type name size'
               }
            }]
        },
        {
            path: 'contact',
            select: 'name _id about profile_picture',
        }
    ];

    
    
    try {
        const {sender,contact} = req.body;
        
        if(!sender || !contact) {
            return res.status(500).json({message: 'sender id is reqiure'});
        };


        if(req?.body?.type === 'MEDIA' && req.file) {

            file_result = await upload_file(req.file,'message')

            message = new Message({...req.body,file:file_result?._id});
            message.save();
        }else {
            message = new Message(req.body);
            message.save();
        }



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
        if(file_result) {
            cloudinary.uploader.destroy(file_result.public_id)
        };
        if(message) {
            await Message.findByIdAndDelete(message?._id);
        }
        next(error);
    }
    
} 

export const get_message_controller = async (req,res,next) => {

    const {chat_id} = req.query;

    if(!chat_id) {
        return res.status(400).json({message: 'chat id is reqiure'})
    }

    try {
        const messages = await Chat.findById(chat_id).populate(
            {
                path: 'messages',
                populate :[
                    {
                        path:'reply_to',
                        populate: {
                            path: 'file',
                            select: 'url _id type name size'
                        }
                    },
                    {
                        path: 'file',
                        select: 'url _id type name size'
                    },
                    {
                        path: 'call',
                    },
                                        {
                        path: 'sender',
                        select: '_id name profile_picture'
                    },
                ]

           }
        )
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