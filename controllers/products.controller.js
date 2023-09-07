import Product from '../models/product.model.js'
import Photo from '../models/photo.model.js'
import Category from '../models/category.model.js'

const createProduct = async (req, res) => {

    let { title, content, photos, price, inStock, categories } = req.body

    let slug = title?.replace(/ /g, "-")?.toLowerCase()

    try {
        photos = await Promise.all(photos?.map(async (i) => (
            await Photo.findOne({ uid: i?.uid })
        )))

        categories = await Promise.all(categories?.map(async (i) => (
            await Category.findById(i)
        )))

        const newProduct = await Product.create({
            title, content, photos, price, inStock, slug, categories
        })
        if (newProduct) {
            console.log("product " + title + " created!")
            return res.status(200).json(newProduct)
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)

    }

}

const getAllProducts = async (req, res) => {
    let Products = await Product.find().populate('photos').populate('categories')
    let Result = [];
    Products.map((item) => {
        item['id'] = item._id;
        Result.push(item)
    })

    return res.status(200).json(Result)
}
const getProductBy = async (req, res) => {
    
    const { by, value } = req.params
    if (!by || !value) {
        res.status(403).json({
            message: "Query is not right"
        });
    }

   
    try {
        const Products = await Product.findOne({ [by]: value, }).populate('photos')
        res.status(200).json(Products)
    } catch (error) {
        res.status(500).json(error)

    }
}
const getProductsBy = async (req, res) => {
    const { by, value } = req.body
    if (!by || !value) {
        return res.status(403).json({
            message: "Query is not right"
        });
    }
    try {
        const Products = await Product.find({ [by]: value })



        return res.status(200).json(Products)
    } catch (error) {
        return res.status(500).json(error)

    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;


    try {
        const Found = await Product.findById(id);
        if (!Found) {
            return res.status(200).json({
                message: "Product ID was not found",
            })
        }

        const Deleted = await Product.findByIdAndRemove(id);
        if (Deleted) {
            return res.status(200).json({
                message: "Successfully deleted product",
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}
const getProductById = async (req, res) => {
    let id = req.params.id;

    try {
        let Found = await Product.findById(id).populate('photos').populate('categories');

        if (Found) {
            return res.status(200).json(Found)
        }
    } catch (error) {
        return res.send(error)
    }
}

const editProduct = async (req, res) => {
    let id = req.params.id;
    let { title, content, photos, updatedAt, price, inStock,categories } =
        req.body;
    try {
      
        photos = await Promise.all(photos?.map(async (i) => (
            await Photo.findOne({ uid: i?.uid })
        )))

        categories = await Promise.all(categories?.map(async (i) => (
            await Category.findById(i)
        )))

        let Found = await Product.findByIdAndUpdate(id, { title, content, photos, updatedAt, price, inStock,categories })
        if (Found) {

            Found['id'] = Found?._id;

            return res.status(200).json(Found)
        }
    } catch (error) {
        return res.send(error)
    }
}
export { createProduct, getAllProducts, getProductBy, getProductsBy, deleteProduct, getProductById, editProduct }