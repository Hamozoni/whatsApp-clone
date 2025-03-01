

export const auth_user = (req,res,next)=> {

    try {

        const {email} = req.body

    }
    catch (error) {
        next(error)
    }

}