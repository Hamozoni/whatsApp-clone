import User from "../models/user.js";



// import User from "../models/user";
const find_user = async (req,res,next) => {
    
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

    try {
        const {email,displayName : name,photoURL:profile_picture,phoneNumber:phone_number,emailVerified:email_verified} = req.body;

        console.log(req.body);

        if(!email) {
           return res.json({message: 'email is reqiured', status: false});
        };

        const exist_user = await User.findOne({email});

        if(exist_user) {
            return res.json({message: 'user is found', status: true, user: exist_user})
        }
        if(!exist_user) {
            const user = {
                email,
                name,
                profile_picture,
                email_verified,
                phone_number
            }
            const created_user = await User.create(user)
            return res.json({message: 'user has been created', status: true, user: created_user})
        }

    }
    catch (error) {
        next(error)
    };

};

export default find_user;