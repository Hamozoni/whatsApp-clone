import Call from "../models/call.model.js";
import User from "../models/user.model.js";


export const post_call = async (req,res,next)=> {
    try {
        const {callee,caller,type,call_status,duration} = req.body;
        if(!callee || !caller) {
            return res.status(401).json({message: 'callee and caller are requred'})
        }
        const call = await Call.create({callee,caller,type,call_status,duration},{new: true});
        call.save();

        await User.updateMany({_id: {$in: [callee,caller]}},{$push:{calls: call._id}});

        return res.status(200).json({call});


    }
    catch (error) {
        next(error)
    }
};