import User from "../models/user.js";



// import User from "../models/user";
const find_user = async (req,res,next) => {
    
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

    try {
        const {email} = req.body;

        console.log(req.body);

        if(!email) {
           return res.json({message: 'email is reqiured', status: false});
        };
        return res.json({message: 'user is not found', status: true})

    }
    catch (error) {
        next(error)
    };

};

export default find_user;