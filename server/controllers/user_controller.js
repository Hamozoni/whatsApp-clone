import User from '../models/user.js';

export const get_user_controller = async (req,res,next) => {  

    const {user_email} = req.query;
    console.log(user_email)

    if(!user_email) {
        return res.json({message: 'user email is reqiured', status: false});
     };
    try {

        const user = await User.findOne({email: user_email});

        if(!user) {
            return res.json({message: 'user is not found', status: false});
        }

        const user_info = await User.findOne({email: user_email});

        return res.json({message: 'user info found', status: true, user: user_info});

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
                _id: uid,
                email,
                name,
                profile_picture,
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
