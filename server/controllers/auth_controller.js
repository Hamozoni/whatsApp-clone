// import User from "../models/user";
const find_user = async (req,res,next) => {

    try {
        const {email} = req.body;

        if(!email) {
           return res.json({message: 'email is reqiured', status: false});
        };
        const user = ''

        if(!user) {
           return  res.json({message: 'user not found', status: false})
        }else {
            return res.json({message: 'user found', status: true, data: user})
        };

    }
    catch (error) {
        next(error)
    };

};

export default find_user;