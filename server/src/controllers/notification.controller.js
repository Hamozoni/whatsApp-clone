import Notification from "../models/notification.model.js";


export const post_notification = async (req,res,next)=> {

    const {user_email,unreaded_messages,missed_calls} = req.body;

    if(!user_email) {
        return res.json({message: 'user email is missing',status: false})
    };

    try {

        if(unreaded_messages) {
            const notification = await Notification.create({user_email,unreaded_messages});
            return res.json({message: 'notification created',status: true,notification})
        }
        if(missed_calls) {
            const notification = await Notification.create({user_email,missed_calls});
            return res.json({message: 'notification created',status: true,notification})
        }

    }
    catch (error){
        next(error);
    }
};

export const get_notification = async (req,res,next)=> {

    const {user_email} = req.body;

    if(!user_email) {
        return res.json({message: 'user email is missing',status: false})
    };

    try {
        const notification = await Notification.findOne({user_email});
        return res.json({message: 'notification found',status: true,notification})
    }
    catch (error){
        next(error);
    }
};

export const put_notification = async (req,res,next)=> {

    const {user_email,unreaded_messages,missed_calls} = req.body;

    if(!user_email) {
        return res.json({message: 'user email is missing',status: false})
    };

    try {

        if(unreaded_messages) {

            const notification = await Notification.findOneAndUpdate({user_email},{$addToSet: {
                unreaded_messages
            }},{new: true});
            return res.json({message: 'notification created',status: true,notification})
        }
        if(missed_calls) {

            const notification = await Notification.findOneAndUpdate({user_email},{$addToSet: {
                missed_calls
            }},{new: true});
            return res.json({message: 'notification created',status: true,notification})
        }

    }
    catch (error){
        next(error);
    }
};
