import Variant from './variant.model.js'

export const createVariant = async () => {
    const variant = await Variant.create(req.body);
    return variant
}

export const getVariants = async () => {
    const variants = await Variant.find().populate("parent");
    return variants
}

export const getVariantById = async (id) => {
    const variant = await Variant.findById(id).populate("parent");
    return variant
}

export const updateVariant = async (id, data) => {
    const updated = await Variant.findByIdAndUpdate(id, data, { new: true });
    return updated
}

export const deleteVariant = async (id) => {
    const variant = await Variant.findByIdAndDelete(id);
    return variant
}