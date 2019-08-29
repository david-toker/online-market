const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    price: {
        type: Number
    },
    imagePath: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
})

module.exports = ProductSchema;