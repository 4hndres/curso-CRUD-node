const { Router } = require("express");
const {check} = require('express-validator');
const router = Router();
const { login, googleSignIn } = require("../controllers/auth-controller");
const { validateFields } = require("../middlewares/validate-fields");

router.post('/login',[
    check('email', 'You must enter a valid email').isEmail(),
    check('password', 'You must enter a password').not().isEmpty(),
    validateFields
],login)

router.post('/google',[
    check('id_token', 'id_token is necesary!!!').not().isEmpty(),
    validateFields
],googleSignIn)

module.exports = router