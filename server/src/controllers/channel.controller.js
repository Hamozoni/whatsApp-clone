
export const post_channel = async (req,res,next)=> {

    try {
        const {name,description,admin} = req.body;

        if(!name || !description || !admin) {
            return res.status(5000).json({message: 'name and description andadminr are requred'})
        };

        
    }
    catch (error) {
        next(error)
    }

}