const { Router } = require("express");
const {check} = require('express-validator');
const router = Router();
const {validateFields, validateJWT, validateAdminRole, hasRole} = require('../middlewares')
const { validateRole, validateEmail, validateId } = require("../helpers/db-validators");
const { GetUsers, PutUsers, PostUsers, DeleteUsers, PatchUsers } = require("../controllers/users-controller");

// GET ALL USERS
router.get("/", GetUsers);

// CREATE NEW USER
router.post("/", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La password debe tener al menos 6 caracteres').isLength({min:6}),
    // check('email', 'El email no es valido').isEmail(),
    check('email').custom(validateEmail),
    // check('role', 'El rol enviado no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(validateRole),
    validateFields
],PostUsers);

// UPDATE USER
router.put("/:userId", [
    check('userId','Is not a valid Id').isMongoId(),
    check('userId').custom(validateId),
    check('role').custom(validateRole),
    validateFields
], PutUsers);

// DELETE USER
router.delete("/:userId", [
    validateJWT,
    // validateAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE', 'DUNNO_ROLE'),
    check('userId','Is not a valid Id').isMongoId(),
    check('userId').custom(validateId),
    validateFields
],DeleteUsers);

router.patch("/", PatchUsers);

module.exports = router;
