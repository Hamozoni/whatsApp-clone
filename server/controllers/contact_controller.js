import User from "../models/user.js";

export const get_contact_controller = async (req,res,next)=> {

    const {user_email,contact_email} = req.query;

    if(!user_email || !contact_email) {
        return res.json({status: false, message: 'user or contact email is missing'})
    }

     try{

        const user = await User.findOne({email: user_email})

        if(!user) {
            return res.json({status: false, message: 'user is not found'})
        };

        const contact = await User.findOne({email: contact_email});

        if(!contact) {
            return res.json({status: false, message: 'contact is not found'})
        };

        return res.json({status: true, message: 'contact is found',contact})
    }
    catch (error){
        next(error);
    }
};

export const update_contact_controller = async (req,res,next)=> {

    const {user_id,contact_id} = req.body;

    console.log({user_id,contact_id});

    if(!user_id || !contact_id) {
        return res.json({message: 'user or contact IDs is missing ', status: fals})
    };


    try {

        const user = await User.findById(user_id);

        if(!user) {
            return res.json({message: 'user is not found', status: fals})
        }

        const contact = await User.findById(contact_id);

        if(!contact) {
            return res.json({message: 'contact is not found', status: fals})
        };


        const updated_user = await User.findByIdAndUpdate(user_id,
            {
                $addToSet :{ contacts: contact_id}
            },{ new: true }
        ).populate('contacts');

        return res.json({message: 'contact has been created',status: true,user:updated_user})
    }
    catch (error) {
        next(error)
    }

}