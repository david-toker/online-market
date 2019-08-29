const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        min: 1
    },
    price: {
        type: Number,
        validate(value) {
            if(value<0) {
                throw new Error('Price must be positive')
            }
        }
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }
})

module.exports = ItemSchema;