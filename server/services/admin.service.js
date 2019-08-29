const mongoose = require('mongoose');
const _ = require('lodash');

const ProductSchema = require('../models/product.model');
const CategorySchema = require('../models/category.model');

const Product = mongoose.model('Product', ProductSchema);
const Category = mongoose.model('Category', CategorySchema);

createNewProduct = (req, res) => new Promise((resolve, reject) => {
    try {

        const {product, price, category} = JSON.parse(req.body.groceryText);
        const newProduct = new Product({name: product, price: price, category: category, imagePath:`/uploads/${req.files.groceryImg.name}`})
        
        // add product to cart
        
        newProduct.save((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 

editProduct = (req, res) => new Promise((resolve, reject) => {
    try {

        const {idProduct, name, price, category} = JSON.parse(req.body.groceryText);
        if(!name&&!price) {
            Product.findByIdAndUpdate(idProduct, {category})
            .exec((err,data)=> {
                if(err){
                    return reject(err);
                }   
                return resolve(data);
            })
        }else if(!name) {
            Product.findByIdAndUpdate(idProduct, {price, category})
            .exec((err,data)=> {
                if(err){
                    return reject(err);
                }   
                return resolve(data);
            })
        }else if(!price) {
            Product.findByIdAndUpdate(idProduct, {name, category})
            .exec((err,data)=> {
                if(err){
                    return reject(err);
                }   
                return resolve(data);
            })
        }else {
            Product.findByIdAndUpdate(idProduct, {name, price, category})
            .exec((err,data)=> {
                if(err){
                    return reject(err);
                }   
                return resolve(data);
            })
        }
 
    } catch (error) {
        return reject(error)
    }
}); 


const updateImage = (req, res) => new Promise((resolve, reject) => {
    const {idProduct} = JSON.parse(req.body.groceryText);
    Product.findByIdAndUpdate(idProduct, { imagePath: `/uploads/${req.files.groceryImg.name}` }).exec((err,data)=> {
        if(err){
            return reject(err);
        }   
        return resolve(data);
    })
  });

module.exports = {
    createNewProduct,
    updateImage,
    editProduct
}