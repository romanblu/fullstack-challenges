import Store from './store.model.js';
import Product from '../product/product.model.js';
import asyncHandler from '../../utils/asyncHandler.js'
import ApiError from '../../utils/ApiError.js'
import * as storeService from './store.service.js'

export const getStore = asyncHandler( async (req, res) => {
    
    const store = await storeService.getStore(req.params.id)

    if(!store){
        throw ApiError.notFound("Store not found")
    }
    
    res.status(200).json(store)
})

export const getMyStore = asyncHandler(async (req, res) => {
    try{
        const store = await Store.findOne({ owner: req.user.id });
        res.json( store);
    } catch (error) {
        res.status(500);
        throw new Error('Could not retrieve store. Error: ', error.message);
    }
})

export const updateMyStore = asyncHandler(async (req, res) => {
    const updated = await storeService.updateMyStore(req.user.id, req.body);

    if(!updated) throw ApiError.notFound()
    res.json(updated);
    
})

export const getMyProducts = asyncHandler(async (req, res) => {
    const products = storeService.getMyProducts(req.user.id)
    
    if(!products || products.length === 0) throw ApiError.notFound("No products found")
    res.json(products)
})

