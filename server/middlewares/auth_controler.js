import get_prisma_instance from "../utils/prisma_client";


export const auth_user = async (req,res,next) => {

    try {

        const {email} = req.body;

        if(!email) {
           return res.json({message: 'email is reqiured', status: false});
        }

        const db = get_prisma_instance();

        const user = await db.user.findUnique({where : {email}});

        if(!user) {
           return  res.json({message: 'user not found', status: false})
        }else {
            return res.json({message: 'user found', status: true, data: user})
        }



    }
    catch (error) {
        next(error)
    }

}