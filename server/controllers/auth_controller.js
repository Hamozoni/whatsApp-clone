import {User }from "../models/user.js";



// import User from "../models/user";
const find_user = async (req,res,next) => {

    try {
        const {email} = req.body;

        if(!email) {
           return res.json({message: 'email is reqiured', status: false});
        };
        // const user = await User.findOne({email});

        if('') {
        //   user =  await User.create(req.body)

           return   res.json({message: 'user created', status: true, data: user})
        }else {
            return res.json({message: 'user found', status: true, data: user})
        };

    }
    catch (error) {
        next(error)
    };

};

export default find_user;