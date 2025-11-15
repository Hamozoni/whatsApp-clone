import admin from '../config/firebase_admin.js';
import User from '../models/user.model.js';

const authenticate_and_sync_user = async (req,res,next)=> {

    try {

        
        const auth_header = req.headers.authorization;
        
        if(!auth_header || !auth_header.startsWith('Bearer ')) {
            return res.status(401).json({message: 'unauthorized'})
        };

        const id_token = auth_header.split('Bearer ')[1];
        const decoded_token = await admin.auth().verifyIdToken(id_token);

        let user = await User.findOne({firebaseUid: decoded_token?.uid});

        if(!user){
            user = await User.create({
                displayName: decoded_token.displayName,
                email: decoded_token.email,
                about: decoded_token?.about || 'Hey there! I am using WhatsApp.',
                emailVerified: decoded_token,
                photoURL: decoded_token?.photoURL,
                photoURLId:decoded_token?.photoURLId || null ,
                firebaseUid: decoded_token.uid,
                lastLoginAt: Date.now()
            });
        }else {
            user.lastLoginAt = Date.now();
            await user.save()
        }

        req.user = user;

        next();

    }
    catch (error){
        return res.status(401).json({message: 'invalid token'});
    }
};


export default authenticate_and_sync_user;