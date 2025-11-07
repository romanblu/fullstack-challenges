import Store from './store.model.js';
import Product from '../product/product.model.js';


export const getStore = async (req, res) => {
    try{
        const store = await Store.findById(req.params.id)
        res.json(store)
    }catch (err){
        res.status(500).json({ error: "Error fetching the store data: " + err.message})
    }
}

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

        const products = await Product.find({ seller: req.user.id });
        
        if( !products || products.length === 0 ) {
            return res.status(404).json({message: 'No products found for this seller.'});
        }
        res.json(products);

    } catch (error) {
        console.error("Error fetching products for seller:", error.message);
        return res.status(500).json({ message: 'Could not retrieve products. Error: ', error: error.message });
    
    }
}



// @desc    Create product
// @route   POST /api/store/products
// @access  Private - seller/admin
export const addProduct = (req, res) => {
    
}

export const updateProduct = (req, res) => {}

export const deleteProduct = (req, res) => {}