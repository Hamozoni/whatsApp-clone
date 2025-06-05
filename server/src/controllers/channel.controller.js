import Channel from "../models/channel.model.js";
import { upload_file } from "../utils/upload_file.js";

export const post_channel = async (req,res,next)=> {

    try {
        const {name,description,admin} = req.body;
        const profile_picure = req.file;

        if(!name || !description || !admin || !profile_picure) {
            return res.status(5000).json({message: 'name and description andadminr are requred'})
        };

        const file_result = await upload_file(profile_picure,'channel');

        const new_channel = await Channel.create({name,description,admins:admin,profile_picure:file_result?._id})

        return res.status(200).json({new_channel})


    }
    catch (error) {
        next(error)
    }

};

export const get_channel = async (req,res,nex) => {

    const {user_id} = req.query

    try {

        const channels = await Channel.find({admins: {$in: user_id},followers: {$in : user_id}});

        return res.status(200).json({channels})

    }
    catch {

    }
}