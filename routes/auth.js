const { Router } = require("express");
const {check} = require('express-validator');
const router = Router();
const { login } = require("../controllers/auth-controller");
const { validateFields } = require("../middlewares/validate-fields");

router.post('/login',[
    check('email', 'You must enter a valid email').isEmail(),
    check('password', 'You must enter a password').not().isEmpty(),
    validateFields
],login)

module.exports = router