import { v2 as cloudinary } from 'cloudinary'
import { runMiddleware, myUploadMiddleware } from '../middlewares/multerUploads.js'
import Photo from '../models/photo.model.js';



const handleUpload = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto"
    });
    return res;
}



const MediaUpload = async (req, res) => {
    const { name } = req.body;
    const file = req.file;
   
    try {
        // await runMiddleware(req, res, myUploadMiddleware);
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const cldRes = await handleUpload(dataURI);

        const photoObj = {
            uid: cldRes?.asset_id,
            url: cldRes?.url,
            status: "done",
        }
 
        const dbObj = await Photo.create(photoObj);
        
        return res.json(photoObj);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }

    return res.status(400).json({
        message: 'Image did not uploaded correctly!',
    })

}

export default MediaUpload