import express from 'express'
import { getAllCategories, createCategory, deleteCategory,getCategoryById,updateCategory } from '../controllers/categories.controller.js';

const router = express.Router();

// Read

router.get('/', getAllCategories);
router.post('/', createCategory);
router.delete('/:id',deleteCategory);

router.get('/:id',getCategoryById);
router.patch('/:id',updateCategory);


export default router