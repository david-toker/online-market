const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated} = require('../config/auth');
const OrderSchema = require('../models/order.model');
const Order = mongoose.model('Order', OrderSchema);

const orderService = require('../services/orders.service');
const dashboardService = require('../services/dashboard.service');

const ERROR_CODE = 400;
const handleFailureResponse = (res, err) => res.status(ERROR_CODE).send(err);

router.get('/',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await dashboardService.fetchCart(req,res);
        const order = await orderService.fetchOrder(req,res, cart);
        return res.status(200).send({order});  
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.get('/lastorder',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await dashboardService.fetchLastCart(req,res);
        const order = await orderService.fetchOrder(req,res, cart);
        return res.status(200).send({order});  
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


router.get('/shippingdate', async(req, res) => {
    try{
        
        const allShippingDate = await orderService.checkShippngDate(req, res);
        return res.status(200).send({allShippingDate});  
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


router.get('/numoforders', async(req, res) => {
    try{
        const numOfOrders = await orderService.countOrders();
        return res.status(200).send({numOfOrders})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.put('/', ensureAuthenticated, async (req, res)=>{
    try {
        const cart = await dashboardService.fetchCart(req,res);
        const newOrder = new Order({...req.body, cart: cart._id, user: req.user._id});
        await newOrder.save()
        res.status(201).send(newOrder)
    } catch (e) {
        res.status(400).send(e)
    }
});


module.exports = router;