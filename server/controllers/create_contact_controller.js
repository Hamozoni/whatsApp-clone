import User from "../models/user.js";

const create_contact_controller = async (req,res,next)=> {

    const {user_email,contact_name,contact_email} = req.body;

    console.log(req.body);
    
    if(!user_email) {
        return res.json({message: 'user id is requared ',status: false});
    };

    if(!contact_email) {
        return res.json({message: 'provide at least one email or phone number ',status: false});
    }

    try {
        const existing_user = await User.findOne({email: user_email});

        if(!existing_user) {
            return res.json({message: 'user is not found',status: false});
        };

        const user_contacts = existing_user?.contacts?.find(e=> e.email === contact_email);
        console.log(user_contacts)

        if(user_contacts) {
            return res.json({message: 'contact is one of your contacts',status: false,contact: user_contacts});
        }

        

        const contact = await User.findOne({email: contact_email });
        if(!contact) {
            return res.json({message: 'contact is not found',status: false});
        };
        return res.json({message: 'contact  found',status: true,contact: contact});

    }
    catch (error){
        next(error);
    }
};

export default create_contact_controller;