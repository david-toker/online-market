const mongoose = require('mongoose');
const UserSchema = require('../models/user.model');

const User = mongoose.model('User', UserSchema);



const cbValidUser = (email) => new Promise((resolve, reject) => {
    try {
        User.findOne({ email: email }, (err, data) => {
          resolve(data)
        });
    } catch (error) {
       return reject(error) 
    }
  });

const registerStepOne = (req, res, next) => {
    const {email, idnum, password, password2} = req.body;
    if (!email || !idnum || !password || !password2) {
        return res.status(400).json({message: "complete all fields"});
    }
    if (password !== password2) {
        return res.status(400).json({message: "passwords do not match"});
    }
    return next()
}

const registerStepTwo = (req, res, next) => {
    const {first, last, city, street} = req.body;
    if (!first || !last || !city || !street) {
        return res.status(400).json({message: "complete all fields"});
    }
    return next()
}

const validateUser = async (req, res, next) => {
    try {
        const isUserExist = await cbValidUser(req.body.email, res);
        // console.log(isUserExist)
        if(!(isUserExist)){
            return next()
        }
        return res.status(400).send({message:'Email already exists'})
    } catch (error) {
        return res.sendStatus(400)
    }
}


module.exports = {
    registerStepOne,
    registerStepTwo,
    validateUser
}