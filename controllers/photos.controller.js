import Photo from '../models/photo.model.js';

const createPhoto = async (req, res) => {
    const { uid, status, name, url } = req.body;

    if (!url?.includes('cloudinary')) {
        return res.status(400).json({
            message: "Image should be uploaded in cloudinary before saving to database",
        })
    }

    const savedObj = await Photo.create({
        uid, status, url, name
    })
    return res.status(200).json(savedObj)
}

const getAllPhotos = async (req, res) => {
    try {
        const obj = await Photo.find();

        return res.status(200).json(obj)
    } catch (error) {
        return res.status(400).json(error)

    }

}
const deletePhoto = async (req, res) => {
    const id = req.params.id;


    try {
        const Found = await Photo.findById(id);
        if (!Found) {
            return res.status(200).json({
                message: "Product ID was not found",
            })
        }

        const Deleted = await Photo.findByIdAndRemove(id);
        if (Deleted) {
            return res.status(200).json({
                message: "Successfuly deleted product",
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}
export { createPhoto, getAllPhotos, deletePhoto } 