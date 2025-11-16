import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";


export const get_all_chats = async (req,res,next) => {
    
    const user_uid = req.user.firebaseUid;

    try {
        const chats = await Chat.find({participants: {$in: user_uid}});
        return res.status(200).json({chats});
    }
    catch (error) {
       next(error)
    }
};

export  const get_chat_details = async (req,res,next)=> {

    const user_uid = req.user.firebaseUid;
    const {chatId} = req.params;

    try {

        const chat = await Chat.findById(chatId);

        if(chat.participants.includes(user_uid)){
            return req.status(201).json({chat})
        }else {
            return req.status(401).json({messages: 'unauthorized'})
        }
    

    }
    catch (error) {
        next(error)
    }

};

export const get_chat_messages = async (req,res,next)=> {

}