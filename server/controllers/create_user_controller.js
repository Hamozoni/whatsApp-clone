import User from "../models/user.js";

const create_user = async (req,res,next)=> {

    const {name,email,id} = req.body;

    if(!email) {
        return res.json({message: 'email is reqiured', status: false});
     };

    try{
        
        const exist_user = await User.findOne({email});
    
        if(exist_user){
            return   res.json({message: 'you can not use this email',status: false});
        };

        const new_user = await User.create({email,name,id});

       return res.json({message: 'user has been created', status: true,user: new_user});

    }
    catch (error) {
        next(error)
    }


};

export default create_user;