const express =require('express');
const router = express.Router();
const passport = require('passport');

const loginService =require('../services/login.service')

router.get('/', async(req, res)=>{
    try {
        const users = await loginService.fetchUsers(req, res);
        return res.status(200).send({users})
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

router.post('/', passport.authenticate('local'),
function(req, res) {
  res.send(req.user);
});





module.exports = router;