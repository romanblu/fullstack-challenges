
import Store from './store.model.js'

export const getStore =  async (id) => {
    
    const store = await Store.findById(id)
    return store

}

export const updateMyStore = async (userId, data) => {
    const updated = await Store.findOneAndUpdate({owner : userId}, data, { new: true });
    return updated;
}

export const getMyProducts = async (userId) => {
    const products = await Product.find({ seller: userId });
    return products
}

