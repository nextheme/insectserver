import express from 'express'
import { createProduct,getAllProducts ,getProductBy,getProductsBy,deleteProduct, getProductById, editProduct} from '../controllers/products.controller.js';
const router = express.Router();

// Read
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.get('/search/find/:by/:value', getProductBy)
router.get('/search/query', getProductsBy)

// Create
router.post('/',createProduct);

router.patch('/:id',editProduct);

router.delete('/:id',deleteProduct);


export default router