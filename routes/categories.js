const { Router } = require("express");
const {check} = require('express-validator');
const { validateFields, validateJWT, validateAdminRole } = require("../middlewares");
const { categoryExists } = require("../helpers/db-validators");
const { createCategory, getCategories, getOneCategory, updateCategory, deleteCategory } = require("../controllers/categoeries-controller");
const router = Router();

// GET ALL CATEGORIES LIST (PUBLIC)
    router.get('/', getCategories)


// GET AN SPECIFIC CATEGORY (PUBLIC) USE NEW HELPER categoryExists
router.get('/:id',[
    check('id', 'Is not a valid Id').isMongoId(),
    check('id').custom(categoryExists),
    validateFields
], getOneCategory)

// CREATE CATEGORY (PRIVATE) ANYONE WITH A VALID TOKEN
router.post('/', [
    validateJWT, 
    check('name', 'You must type a name').not().isEmpty(),
    validateFields
], createCategory)

// UPDATE AN SPECIFIC CATEGORY (PRIVATE) ANYONE WITH A VALID TOKEN USE NEW HELPER categoryExists
router.put('/:id', [
    validateJWT,
    check('name', 'You must type a name').not().isEmpty(),
    check('id','Is not a valid Id').isMongoId(),
    check('id').custom(categoryExists),
    validateFields
], updateCategory)

// DELETE AN SPECIFIC CATEGORY (PRIVATE) ADMIN ONLY USE NEW HELPER categoryExists
router.delete('/:id', [
    validateJWT,
    validateAdminRole,
    check('id','Is not a valid Id').isMongoId(),
    check('id').custom(categoryExists),
    validateFields
], deleteCategory)

module.exports = router