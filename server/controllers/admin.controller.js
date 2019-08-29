const express =require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { ensureAuthenticated} = require('../config/auth');
const ProductSchema = require('../models/product.model');
const CategorySchema = require('../models/category.model');

const adminService = require('../services/admin.service');

const Product = mongoose.model('Product', ProductSchema);
const Category = mongoose.model('Category', CategorySchema)

const ERROR_CODE = 400;
const handleFailureResponse = (res, err) => res.status(ERROR_CODE).send(err);


router.get('/',ensureAuthenticated, async(req, res) => {
    try{
        return res.status(200).send(req.user); 
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.patch('/editproduct',ensureAuthenticated, async(req, res) => {
    try {
        if (!req.files) {
            console.log('No files were uploaded.')
        }else{
            const sampleFile = req.files.groceryImg;
            fs.writeFile(path.join(__dirname, `../public/uploads/`, sampleFile.name), sampleFile.data, (err) => console.log(err));
            await adminService.updateImage(req, res)
        }
            
        
        
        const editedProduct = await adminService.editProduct(req, res);
        res.status(200).send(editedProduct)
        
    } catch (error) {
        res.sendStatus(400);
    }
});


router.post('/addproduct',ensureAuthenticated, async (req, res)=>{
    
    try {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');
        
        const sampleFile = req.files.groceryImg;
        fs.writeFile(path.join(__dirname, `../public/uploads/`, sampleFile.name), sampleFile.data, (err) => console.log(err));
        
        const newProduct = await adminService.createNewProduct(req, res);
        res.status(201).send(newProduct)
    } catch (e) {
        res.status(400).send(e)
    }
});



router.patch('/prodtocategory', ensureAuthenticated, async(req, res) => {

    try{
        const {idCategory, idProduct} = req.body;
        const category = await Category.findOneAndUpdate({_id: idCategory},
            {$push: {products: idProduct}},
            {new: true, runValidators: true });
        await category.populate('products').execPopulate();
        return res.status(200).json({category});
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


module.exports = router;