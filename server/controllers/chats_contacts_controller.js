import User from '../models/user.js';
import Chat from '../models/chat.js';

const get_chats_contacts = async (req,res,next) => {

    // res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

    const {email} = req.query;

    console.log(email);

    if(!email) {
        return res.json({message: 'email is reqiured', status: false});
     };
    try {

        const user = await User.findOne({email});
        console.log(user);

        if(!user) {
            return res.json({message: 'user is not found', status: false});
        }


        const chats = await Chat.find({members: user?._id});

        if(!chats) {
            return res.json({message: 'user does not have a chat', status: false, chats: null})
        };
        console.log(chats);

        return res.json({message: 'user chats found', status: true, chats});

    }
    catch (error) {
        next(error)
    }


};

export default get_chats_contacts;
