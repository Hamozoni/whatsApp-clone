
export const post_channel = async (req,res,next)=> {

    try {
        const {name,description,admin} = req.body;
        const profile_picure = req.file;

        if(!name || !description || !admin || !profile_picure) {
            return res.status(5000).json({message: 'name and description andadminr are requred'})
        };

        console.log({name,description,admin,profile_picure});

        return res.status(200).json({name,description,admin,profile_picure})


    }
    catch (error) {
        next(error)
    }

}