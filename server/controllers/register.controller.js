const express =require('express');
const router = express.Router();

const registerService =require('../services/register.service');
const registerValidation = require('../validations/register.validations')


router.post('/step1',registerValidation.registerStepOne, registerValidation.validateUser, async (req, res)=>{
    try {
        await registerService.registerStepOne(req, res);
        return res.sendStatus(201)
    } catch (error) {
        res.status(400).send({error});
    }
});

router.patch('/step2',registerValidation.registerStepTwo, async (req, res)=>{
    try {
        await registerService.registerStepTwo(req, res);
        return res.sendStatus(201)
    } catch (err) {
        console.log(err);
        res.status(400).send({error: "Something went wrong"});
    }
});


module.exports = router;