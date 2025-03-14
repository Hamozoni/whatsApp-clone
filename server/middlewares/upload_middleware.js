import multer from "multer";
import { App_error } from "./error_middleware";

const storage = multer.memoryStorage();

const file_filter = (req,file,cb)=> {
    const allowed_types = ['image/jpeg', 'image/png', 'image/webp'];

    if(!allowed_types.includes(file.mimeType)) {
        return cb(new App_error('Invalid file type. Only images are allowed!', 400),fals)
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits: {fieldSize: 10 * 1024 * 1024 },
    fileFilter: file_filter
});


export default upload;
