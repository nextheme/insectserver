import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title: { type: String },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    slug: { type: String, unique: true },

})

const Category = mongoose.model('Category', CategorySchema);

export default Category;