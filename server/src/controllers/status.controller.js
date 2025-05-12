
import Status from '../models/status.model.js';
import User from '../models/user.model.js';

export const post_status = async (req,res,next)=> {
    try {

        const data = req.body;

        console.log(data)

        if(!data.user) {
          return  res.status(401).json({message: 'user id is required'})
        };

        if(data.type === 'TEXT') {
            const status = await Status.create(data);

            console.log(status)

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
            const statuses = await Status.find({user: {$in : user.contacts}}).populate({path: 'user' ,select: 'name _id profile_picture'})
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