import User from "../models/user.js";

export const post_contact_controller = async (req,res,next)=> {

    const {user_id,contact_id} = req.body;
     try{

    }
    catch (error){
        next(error);
    }
};