const mongoose = require('mongoose');
const OrderSchema = require('../models/order.model');
const _ = require('lodash');
const Order = mongoose.model('Order', OrderSchema);


const countOrders = () => new Promise((resolve, reject) => {
    try {
        Order.countDocuments({}, (err, count) => {
                if(err) {
                    return reject(err)
                }
                return resolve(count);
          });
    } catch (error) {
       return reject(error) 
    }
  });

  const fetchOrder = (req, res, cart) => new Promise((resolve, reject) => {
    try {
        // console.log(req.user._id)
        Order.findOne({user: req.user._id, cart: cart})
        .populate('user cart').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });  

  const checkShippngDate = (req, res) => new Promise((resolve, reject) => {
    try {
        Order.find({})
        .exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            let arrShipDate = data.map(o=>o.shippingDate);
            return resolve(_.countBy(arrShipDate));
        });
    } catch (error) {
       return reject(error) 
    }
  });

module.exports = {
    countOrders,
    fetchOrder,
    checkShippngDate
}