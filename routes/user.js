const { Router } = require("express");
const { GetUsers, PutUsers, PostUsers, DeleteUsers, PatchUsers } = require("../controllers/users-controller");
const router = Router();
const {check} = require('express-validator');
const { validateFields } = require("../middlewares/validate-fields");
const { validateRole, validateEmail, validateId } = require("../helpers/db-validators");


router.get("/", GetUsers);

router.put("/:userId", [
    check('userId','Is not a valid Id').isMongoId(),
    check('userId').custom(validateId),
    check('role').custom(validateRole),
    validateFields
], PutUsers);

router.post("/", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La password debe tener al menos 6 caracteres').isLength({min:6}),
    // check('email', 'El email no es valido').isEmail(),
    check('email').custom(validateEmail),
    // check('role', 'El rol enviado no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(validateRole),
    validateFields
],PostUsers);

router.delete("/:userId", [
    check('userId','Is not a valid Id').isMongoId(),
    check('userId').custom(validateId),
    validateFields
],DeleteUsers);

router.patch("/", PatchUsers);

module.exports = router;
