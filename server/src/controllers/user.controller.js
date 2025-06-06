import Channel from '../models/channel.model.js';
import Chat from '../models/chat.model.js';
import User from '../models/user.model.js';

export const get_user_controller = async (req,res,next) => {  

    const {user_email} = req.query;

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

    if(!user_email) {
        return res.status(404).json({message: 'user email is reqiured'});
     };

    try {

        const user = await User.findOne({email: user_email}).populate([
            {
              path: 'contacts',
              select: 'name _id about profile_picture',
            },
            {
                path: 'calls',
                populate : call_populate
            },
          ])
          .select('name _id about profile_picture')

        if(!user) {
            return res.status(500).json({message: 'user is not found'});
        }
        

        const chats = await Chat.find({user: user?._id}).populate([
            {
              path: 'contact',
              select: 'name _id about profile_picture',
            },
            {
                path: 'last_message',
                select: '_id sender status text type createdAt user',
                populate: [
                    {
                        path: 'file',
                        select: '_id name type size'
                    },
                    {
                        path: 'call',
                        populate : call_populate
                    }
                ],
                
              },
          ])
          .select('createdAt contact last_message user _id');

        const channels = await Channel.find().populate({path: 'avatar',select: '_id url'})
        
        
        return res.status(200).json({message: 'user info found', user,chats,channels});

    }
    catch (error) {
        next(error)
    }


};

export const post_user_controller = async (req,res,next)=> {
    
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    
    const {email,displayName : name,photoURL:profile_picture,phoneNumber:phone_number,emailVerified:email_verified,uid} = req.body;

    if(!email) {
       return res.json({message: 'email is reqiured', status: false});
    };
    
    try {
        const exist_user = await User.findOne({email});

        if(exist_user) {
            return res.json({message: 'user is found', status: true, user: exist_user,is_new: false})
        }
        if(!exist_user) {
            const user = {
                id: uid,
                email,
                name,
                profile_picture : profile_picture || '/placeholder_avatar.jpg',
                email_verified,
                phone_number
            }
            const created_user = await User.create(user);

            return res.json({message: 'user has been created', status: true, user: created_user,is_new: true})
        }

    }
    catch (error) {
        next(error)
    };

};
