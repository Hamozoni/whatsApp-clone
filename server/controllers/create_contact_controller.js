import User from "../models/user.js";

const create_contact_controller = async (req,res,next)=> {

    const {user_id,contact_name,contact_email,contact_phone} = req.params;
    
    if(!user_id) {
        return res.json({message: 'user id is requared ',status: false});
    };

    if(!contact_email && !contact_phone) {
        return res.json({message: 'provide at least one email or phone number ',status: false});
    }

    try {

        const existing_user = await User.findOne({id: user_id});

        if(!existing_user) {
            return res.json({message: 'user is not found',status: false});
        };

        

        const contact = await User.findOne({$or:[{email: contact_email },{ phone_number: contact_phone}]});
        if(!contact) {
            return res.json({message: 'contact is not found',status: false});
        };
        return res.json({message: 'contact  found',status: true,contact: contact});


    }
    catch (error){
        next(error);
    }
}