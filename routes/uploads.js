const { Router } = require("express");
const {check} = require('express-validator');
const router = Router();
const { uploadFile, updateImage, showImage, updateImageCloudinary } = require("../controllers/uploads-controller");
const { allowedCollections } = require("../helpers");
const { validateUploads, validateFields } = require("../middlewares");

// UPLOAD IMAGE ON SPECIFIED MODEL
router.post('/', validateUploads ,uploadFile)

// UPDATE IMAGE O SPECIFIED MODEL
router.put('/:collection/:id', [
    validateUploads, 
    check('id', 'This is not a mongo id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields,
// ], updateImage)
], updateImageCloudinary)

// GET IMAGES OF SPECIFIED MODEL
router.get('/:collection/:id', [
    check('id', 'This is not a mongo id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields,
], showImage)

module.exports = router