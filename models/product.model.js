import mongoose from "mongoose";
import { Schema } from "mongoose";
import Photo from "./photo.model.js";
import Category from './category.model.js'

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    photos: [{type: mongoose.Types.ObjectId, ref: "Photo"}],
    price: { type: Number },
    inStock: { type: Boolean },
    categories: [{ type: mongoose.Types.ObjectId, ref:"Category" }],
    slug: { type: String,  unique: true, dropDups: true },

}, {
    versionKey: false,
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema);

export default Product;