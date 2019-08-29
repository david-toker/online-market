const mongoose = require('mongoose');
const CartSchema = require('../models/cart.model');
const ItemSchema = require('../models/cart-item.model');

const Cart = mongoose.model('Cart', CartSchema);
const Item = mongoose.model('Item', ItemSchema);



const fetchCart = (req, res) => new Promise((resolve, reject) => {
    try {
        Cart.findOne({user: req.user._id, status: "active"})
        .populate('user').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });


const fetchLastCart = (req, res) => new Promise((resolve, reject) => {
    try {
        Cart.findOne({user: req.user._id, status: "complete"})
        .sort({createdDate: -1})
        .populate('user').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });

const createCart = (req, res) => new Promise((resolve, reject) => {
    try {
        const newCart = new Cart({user: req.user._id});
        newCart.save((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
})

const addProductToCart = (req, res) => new Promise((resolve, reject) => {
    try {
        // add product to cart
        let {product, quantity, price} = req.body;
        price = price*quantity;
        const newItem = new Item({product, quantity, price, cart: personalCart});
        newItem.save((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 

const incQtyOfProductInCart = (req, res, cart) => new Promise((resolve, reject) => {
    try {
        const { item, quantity, price } = req.body;

        Item.findOneAndUpdate({_id: item, cart: cart}, { $inc: { quantity: quantity, price: price*quantity } }, {new: true, runValidators: true }).populate('product').exec((err,data)=> {
            if(err){
                return reject(err);
            }   
            
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
});

const incProductInCart = (req, res, cart) => new Promise((resolve, reject) => {
    try {
        const { price } = req.body;
        Item.findOneAndUpdate({_id: req.params.id, cart: cart}, { $inc: { quantity: 1, price: price } }, {new: true, runValidators: true }).populate('product').exec((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 

const decProductInCart = (req, res, cart) => new Promise((resolve, reject) => {
    try {
        const { price } = req.body;
        Item.findOneAndUpdate({_id: req.params.id, cart: cart}, { $inc: { quantity: -1, price: -price } }, {new: true, runValidators: true  }).exec((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 

const checkoutCart = (cart) => new Promise((resolve, reject) => {
    try {
        
        Cart.findOneAndUpdate({_id: cart}, { status: 'complete' }, {new: true, runValidators: true  }).exec((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 


const deleteProductFromCart = (req, res, cart) => new Promise((resolve, reject) => {
    try {
        
        Item.findByIdAndDelete(req.params.id).exec((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 


const deleteAllProductsFromCart = (req, res, cart) => new Promise((resolve, reject) => {
    try {
        
        Item.deleteMany({cart: cart._id}).exec((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 

const fetchCartItems = (cartId) => new Promise((resolve, reject) => {
    try {
        
        Item.find({cart: cartId})
        .populate('product cart').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            // console.log(err, data);
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });

module.exports = {
    fetchCart,
    createCart,
    addProductToCart,
    fetchCartItems,
    incProductInCart,
    decProductInCart,
    deleteProductFromCart,
    checkoutCart,
    incQtyOfProductInCart,
    fetchLastCart,
    deleteAllProductsFromCart
}