const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { ensureAuthenticated} = require('../config/auth');
const CartSchema = require('../models/cart.model');
const Cart = mongoose.model('Cart', CartSchema);

const dashboardService = require('../services/dashboard.service');

const ERROR_CODE = 400;
const handleFailureResponse = (res, err) => res.status(ERROR_CODE).send(err);

router.get('/',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await dashboardService.fetchCart(req,res);
        if(cart) {
            const allProductsInCart = await dashboardService.fetchCartItems(cart._id);
            return res.status(200).send({allProductsInCart});
        } else {
            return res.status(404).send({message: "You don't have any items in your cart. Let's get shopping!"});
        }
        
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.get('/cart',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await dashboardService.fetchCart(req,res);
        
        return res.status(200).send({user:req.user, cart:cart});
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.patch('/checkout',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await dashboardService.fetchCart(req,res);
        if(cart) {
            const completedCart = await dashboardService.checkoutCart(cart._id);
            return res.status(200).send({completedCart});
        } else {
            return res.status(404).send({message: "You don't have any items in your cart. Let's get shopping!"});
        }
        
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


router.post('/newcart', ensureAuthenticated, async (req, res)=>{
    try {
        await dashboardService.createCart(req, res)
        res.sendStatus(201)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.put('/additem', ensureAuthenticated, async (req, res)=>{
    try {
        global.personalCart = await dashboardService.fetchCart(req,res);
        const newProductInCart = await dashboardService.addProductToCart(req, res);
        res.status(201).send(newProductInCart)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.patch('/incqtyitem', ensureAuthenticated, async (req, res)=>{
    try {
        const cartWithProducts = await dashboardService.fetchCart(req,res);
        const updatedProductInCart = await dashboardService.incQtyOfProductInCart(req, res, cartWithProducts);
        
        res.status(200).send({updatedProductInCart})
    } catch (e) {
        res.status(400).send(e)
    }
});



router.delete('/removeitem/:id', ensureAuthenticated, async (req, res)=>{
    try {
        const cartWithProducts = await dashboardService.fetchCart(req,res);
        const deletedProductFromCart = await dashboardService.deleteProductFromCart(req, res, cartWithProducts);
        if (!deletedProductFromCart) {
            return res.sendStatus(404)
        }
        res.send(deletedProductFromCart)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/removeallitems', ensureAuthenticated, async (req, res)=>{
    try {
        const cartWithProducts = await dashboardService.fetchCart(req,res);
        const deletedProductFromCart = await dashboardService.deleteAllProductsFromCart(req, res, cartWithProducts);
        if (!deletedProductFromCart) {
            return res.sendStatus(404)
        }
        res.send(deletedProductFromCart)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.patch('/additem/inc/:id', ensureAuthenticated, async (req, res)=>{
    try {
        const cartWithProducts = await dashboardService.fetchCart(req,res);
        const updatedProductInCart = await dashboardService.incProductInCart(req, res, cartWithProducts);
        
        res.status(200).send({updatedProductInCart})
    } catch (e) {
        res.status(400).send(e)
    }
});

router.patch('/additem/dec/:id', ensureAuthenticated, async (req, res)=>{
    try {
        const cartWithProducts = await dashboardService.fetchCart(req,res);
        const updatedProductInCart = await dashboardService.decProductInCart(req, res, cartWithProducts);
        
        res.status(200).send({updatedProductInCart})
    } catch (e) {
        res.status(400).send(e)
    }
});




module.exports = router;