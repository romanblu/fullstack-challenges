import Category from './category.model.js'


export const createCategory = async (data) => {
    const category = await Category.create(data);
    return category
}

export const getCategories = async () => {
    const categories = await Category.find().populate("parent");
    return categories
}

export const getCategoryById = async (id) => {
    const category = await Category.findById(id).populate("parent");
    return category
}

export const getCategoryTree = async () => {
    const categories = await Category.find().lean();

    const map = {};
    categories.forEach(cat => (map[cat._id] = { ...cat, children: [] }));

    const tree = [];

    categories.forEach(cat => {
        if (cat.parent) {
        map[cat.parent]?.children.push(map[cat._id]);
        } else {
        tree.push(map[cat._id]);
        }
    });

    return tree;
}

export const updateCategory = async (catId, data) => {
    const updated = await Category.findByIdAndUpdate(catId, data, { new: true });
    return updated
}


export const deleteCategory = async(catId) => {
    const category = await Category.findByIdAndDelete(catId);
    return category
}