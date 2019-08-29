const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ProductSchema = require('../models/product.model');
const CategorySchema = require('../models/category.model');
const storehouseService =require('../services/storehouse.service');

const Product = mongoose.model('Product', ProductSchema);
const Category = mongoose.model('Category', CategorySchema);

const SUCCESS_CODE = 200;
const ERROR_CODE = 400;

const handleSuccessResponse = (res, data) => res.status(SUCCESS_CODE).send(data);
const handleFailureResponse = (res, err) => res.status(ERROR_CODE).send(err);

router.get('/categories', async(req, res) => {
    try{
        const categories = await storehouseService.fetchCategories(req,res);
        return res.status(200).json({categories})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});
router.get('/categories/:id', async(req, res) => {

    try{
        const { id } = req.params;
        const category = await Category.findById(id);
        await category.populate('products').execPopulate();
        return res.status(200).json({category});
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.get('/products', async(req, res) => {
    try{
        const products = await storehouseService.fetchProducts(req,res);
        return res.status(200).json({products})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.get('/numofproducts', async(req, res) => {
    try{
        const numOfProducts = await storehouseService.countProducts();
        return res.status(200).send({numOfProducts})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.get('/products/:productName', async(req, res) => {
    try{
        const { productName } = req.params;
        const product = await Product.findOne({name: productName.toLowerCase()});
        await product.populate('category').execPopulate();
        return res.status(200).json({product})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


module.exports = router;