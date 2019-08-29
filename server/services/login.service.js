const mongoose = require('mongoose');
const UserSchema = require('../models/user.model');

const User = mongoose.model('User', UserSchema);


const fetchUsers = (req, res) => new Promise((resolve, reject) => {
    try {
        User.find({}, (err, data) => {
          resolve(data)
        });
    } catch (error) {
       return reject(error) 
    }
  });
  

module.exports = {
    fetchUsers
}