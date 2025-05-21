
import Status from '../models/status.model.js';
import User from '../models/user.model.js';
import { upload_file } from '../utils/upload_file.js';

export const post_status = async (req,res,next)=> {
    try {

        const data = req.body;

        console.log(data)
        console.log(req.file)

        if(!data.user) {
          return  res.status(401).json({message: 'user id is required'})
        };

        if(data.type === 'TEXT') {
            const status = await Status.create(data)
            return res.status(200).json({status});
        }else if (data.type === 'MEDIA') {
            const file_result = await upload_file(req.file,'status')
            const status = await Status.create({...data,file:file_result._id})
            return res.status(200).json({status});
        }
    }
    catch (error) {
        next(error)
    }
};

export const get_status = async (req,res,next)=> {

    const {user_id} = req.query;


    try  {

        if(!user_id) {
            return res.status(400).json({message: 'user id is requred'})
        };


        const user = await User.findById(user_id);

        if(user.contacts) {
            const statuses = await Status.find({user: {$in : user.contacts}
            }).populate([
                {path: 'user' ,select: 'name _id profile_picture'},
                {path: 'file',select: '_id url type'}])
            return res.status(200).json({statuses})

        }
        else {
            return res.status(200).json({statuses: []});
        }
    }
    catch (error) {
        next(error)
    }
}