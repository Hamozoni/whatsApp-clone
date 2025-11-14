import admin from '../config/firebase_admin.js';

const authenticate_and_sync_user = async (req,res,next)=> {

    try {

        console.log('hi')

        const auth_header = req.headers.Authorization;
        if(!auth_header || !auth_header.startsWith('Bearer ')) {
            return res.status(401).json({message: 'unauthorized'})
        };
        
        
        const id_token = auth_header.split('Bearer ')[1];
        const decoded_token = await admin.auth().verifyIdToken(id_token);
        console.log(decoded_token);


        next()


    }
    catch (error){

        console.log(error.message)
        return res.status(500).json({message: error.message});
    }
};


export default authenticate_and_sync_user;