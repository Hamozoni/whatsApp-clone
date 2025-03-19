import User from '../models/user.js';

export const get_user_controller = async (req,res,next) => {  

    const {user_id} = req.query;
    console.log(user_id)

    if(!user_id) {
        return res.json({message: 'user id is reqiured', status: false});
     };
    try {

        const user = await User.findById(user_id);

        if(!user) {
            return res.json({message: 'user is not found', status: false});
        }

        const user_info = await User.findById(user_id);

        return res.json({message: 'user info found', status: true, user: user_info});

    }
    catch (error) {
        next(error)
    }


};



export const post_user_controller = async (req,res,next)=> {

    const {name,email,_id} = req.body;

    if(!email) {
        return res.json({message: 'email is reqiured', status: false});
     };

    try{
        
        const exist_user = await User.findOne({email});
    
        if(exist_user){
            return   res.json({message: 'you can not use this email',status: false});
        };

        const new_user = await User.create({email,name,_id});

       return res.json({message: 'user has been created', status: true,user: new_user});

    }
    catch (error) {
        next(error);
    }


};
