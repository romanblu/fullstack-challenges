

export const createVariant = (data) => {
    if (!data.product) throw new Error('Product ID is required')
    if (!data.name) throw new Error('Variant name is required')
    if (!data.sku) throw new Error('Variant SKU is required')
    if (!data.price) throw new Error('Price is required')
}