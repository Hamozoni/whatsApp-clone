import User from '../models/user.js';
import Chat from '../models/chat.js';

const get_chats_contacts = async (req,res,next) => {

    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

    const {email} = req.body;
    console.log(req.body)

    if(!email) {
        return res.json({message: 'email is reqiured', status: false});
     };
    try {

        const user = await User.findOne({email});

        if(!user) {
            return res.json({message: 'user is not found', status: false});
        }

        console.log(user);

        const chats = await Chat.find({members: user?._id});

        if(!chats) {
            return res.json({message: 'user does not have a chat', status: false, chats: null})
        };

        return res.json({message: 'user chats found', status: false, chats});
        console.log(chats);

    }
    catch (error) {
        next(error)
    }


};

export default get_chats_contacts;
