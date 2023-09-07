import Category from '../models/category.model.js'

const createCategory = async (req, res) => {
    const { title, slug, parent } = req.body;
    let parentObj;
    try {
        if (parent) {
            parentObj = await Category.findById(parent);
        }

        const cat = await Category.create({
            title, slug, parent: parentObj
        })

        res.status(200).json(cat)

    } catch (error) {
        res.status(400).send(error)
    }
}
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('parent')
        res.status(200).json(categories);

    } catch (error) {
        res.send(error);

    }
}
const deleteCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const Found = await Category.findById(id);
        if (!Found) {
            return res.status(200).json({
                message: "Category ID was not found",
            })
        }

        const Deleted = await Category.findByIdAndRemove(id);

        if (Deleted) {
            return res.status(200).json({
                message: "Category successfully deleted"
            })
        }

    } catch (error) {
        return res.status(400).send(error)
    }

}
const getCategoryById = async (req, res) => {
    const id = req.params.id;

    try {
        const cat = await Category.findById(id).populate('parent');
        if (cat) {
            return res.status(200).send(cat);
        }
        return res.status(200).json({
            message: "Category was not found"
        });

    } catch (error) {
        res.status(400).send(error);
    }
}

const updateCategory = async (req, res) => {
    let id = req.params.id;
    const { slug, parent, title } = req.body;

    try {
        const Updated = await Category.findByIdAndUpdate(id, {
            slug, parent, title
        })
        if (Updated) {
            return res.send({
                message: "Category updated successfully",
            })
        }
    } catch (error) {
        res.status(400).send(error);
    }
}
export { createCategory, getAllCategories, deleteCategory, getCategoryById, updateCategory }