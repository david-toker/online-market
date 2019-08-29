const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    first: {
        type: String,
        trim: true
    },
    last: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    idnum: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    street: {
        type: String,
        trim: true
    },
    role: {
        type: Boolean,
        default: 0
    }
})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    // delete userObject.role

    return userObject
}

module.exports = UserSchema;



