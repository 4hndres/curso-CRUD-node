const { Router } = require("express");
const {check} = require('express-validator');
const { validateFields, validateJWT, validateAdminRole } = require("../middlewares");
const { productExists, productIsAvailable, categoryExists } = require("../helpers/db-validators");
const { createProduct, getProducts, getOneProduct, updateProduct, deleteProduct } = require("../controllers/products-controller");
const categorie = require("../models/categorie");
const router = Router();

// GET ALL PRODUCTS LIST (PUBLIC)
    router.get('/', getProducts)


// GET AN SPECIFIC PRODUCT (PUBLIC) USE NEW HELPER categoryExists
router.get('/:id',[
    check('id', 'Is not a valid Id').isMongoId(),
    check('id').custom(productExists),
    validateFields
], getOneProduct)

// CREATE PRODUCT (PRIVATE) ANYONE WITH A VALID TOKEN
router.post('/', [
    validateJWT, 
    check('name', 'You must type a name for the product').not().isEmpty(),
    check('categorie', 'This id is not valid').isMongoId(),
    check('categorie').custom(categoryExists),
    validateFields
], createProduct)

// UPDATE AN SPECIFIC PRODUCT (PRIVATE) ANYONE WITH A VALID TOKEN USE NEW HELPER categoryExists
router.put('/:id', [
    validateJWT,
    // check('categorie', 'This id is not valid').isMongoId(),
    check('id').custom(productExists),
    validateFields
], updateProduct)

// DELETE AN SPECIFIC PRODUCT (PRIVATE) ADMIN ONLY USE NEW HELPER productExists
router.delete('/:id', [
    validateJWT,
    validateAdminRole,
    check('id','Is not a valid Id').isMongoId(),
    check('id').custom(productExists),
    validateFields
], deleteProduct)

module.exports = router