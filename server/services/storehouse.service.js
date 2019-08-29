const mongoose = require('mongoose');
const ProductSchema = require('../models/product.model');
const CategorySchema = require('../models/category.model');

const Product = mongoose.model('Product', ProductSchema);
const Category = mongoose.model('Category', CategorySchema);


const fetchCategories = (req,res) => new Promise((resolve, reject) => {
    try {
        Category.find({})
        .populate('products')
        .exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });
  
const fetchProducts = (req, res) => new Promise((resolve, reject) => {
    try {
        Product.find({})
        .populate('category').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });

const countProducts = () => new Promise((resolve, reject) => {
    try {
        Product.countDocuments({}, (err, count) => {
                if(err) {
                    return reject(err)
                }
                return resolve(count);
          });
    } catch (error) {
       return reject(error) 
    }
  });

module.exports = {
    fetchCategories,
    fetchProducts,
    countProducts
}