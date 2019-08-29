const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = require('../models/user.model');

const User = mongoose.model('User', UserSchema);


const registerStepOne = (req, res) =>  new Promise ((resolve,reject)=> {
  const {email, idnum, password} = req.body;
  const newUser = new User({email, idnum, password});
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
          if (err) throw err;
          newUser.password = hash;
          // console.log(password);
          newUser.save((err, data)=>{
            if(err) {
              return reject(err)
            }
            global.userOnRegestration=data.email;
            return resolve(data.email);
          })
          
      });
  }); 
})

const registerStepTwo = (req, res) => new Promise((resolve, reject) => {
    const {first, last, city, street} = req.body;
    User.where({ email: userOnRegestration }).updateOne({first, last, city, street}, function(err, user){
        if(err) {
          return reject(err)
        }
        return resolve(user);
    });
  })

module.exports = {
    registerStepOne,
    registerStepTwo
}