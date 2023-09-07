import express from 'express'
import { createPhoto,getAllPhotos, deletePhoto } from '../controllers/photos.controller.js';
const router = express.Router();

router.get('/', getAllPhotos);
router.post('/', createPhoto);
router.delete('/:id',deletePhoto);


export default router;