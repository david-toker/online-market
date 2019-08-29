const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "active"
    }
})

module.exports = CartSchema;