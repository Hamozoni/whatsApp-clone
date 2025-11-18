
import Status from '../models/status.model.js';
import User from '../models/user.model.js';
import { upload_file } from '../utils/upload_file.js';


export const get_status = async (req,res,next)=> {

    const {_id,contacts} = req.user;
    try  {

        const status = await Status.find({onwer:{$in: [...contacts,_id]}})
        return res.status(200).json(status)
    }
    catch (error) {
        next(error)
    }
}