
import Status from '../models/status.model.js';

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
}