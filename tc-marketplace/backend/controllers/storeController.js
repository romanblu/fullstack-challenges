import Store from '../models/Store.js';

export const getMyStore = async (req, res) => {
    try{
        const store = await Store.findOne({ owner: req.user.id });
        res.json( store);
    } catch (error) {
        res.status(500);
        throw new Error('Could not retrieve store. Error: ', error.message);
    }
}
export const updateMyStore = async (req, res) => {
    try{
        const updated = await Store.findOneAndUpdate({owner : req.user.id}, req.body, { new: true });
        res.json(updated);
    }catch(err){
        res.status(500)
        throw new Error('Could not update store details. ', err.message)
    }
}

export const getMyProducts = async (req, res) => {
    try{
        const store = await Store.findOne({ owner: req.user.id });
        const products = await Product.find({ store: store._id.toString() });
        res.json(products);

    } catch (error) {
        res.status(500);
        throw new Error('Could not retrieve products. Error: ', error.message);
    }
}

// @desc    Create product
// @route   POST /api/store/products
// @access  Private - seller/admin
export const addProduct = (req, res) => {
    
}

export const updateProduct = (req, res) => {}

export const deleteProduct = (req, res) => {}