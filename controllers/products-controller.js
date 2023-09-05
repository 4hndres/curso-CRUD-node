const { response } = require("express");
const { Product } = require("../models");

// GET CATEGORIES - PAGED - TOTAL OF DOCUMENTS - POPULATE(OBJ WITH USER INFO)
const getProducts = async (req, resp = response) => {
    const { lim = 5, from = 0 } = req.query;
    const query = {status: true}

    const [total, products] = await Promise.all([
        await Product.countDocuments(query),
        await Product.find(query)
        .populate('categorie', 'name')
        .populate('user', 'name')
        .skip(Number(from)).limit(Number(lim))
    ])

    resp.json({total, products})
}

// GET A CATEGORY - POPULATE(OBJ WITH USER INFO)
const getOneProduct = async (req, resp = response) => {
    const id = req.params.id;
    const product = await Product.findById(id)
    .populate('categorie', 'name')
    .populate('user', 'name')
    resp.status(500).json({ msg: "Get API - controller", product });
}

// CREATE NEW CATEGORY
const createProduct = async(req,  resp = response) => {
    const {status, user, ...rest} = req.body
    const productDB = await Product.findOne({name: rest.name})
    if (productDB) 
        resp.status(400).json({msg: `The product ${productDB.name} already exists!!!`})

        // GENERATE DATA THAT WE'RE GOING TO STORE
    const data = {
        ...rest,
        name: rest.name.toUpperCase(),
        user: req.user._id,
    }

    const product = new Product(data)
    await product.save()
    resp.status(201).json(product)
}

// UPDATE CATEGORY
const updateProduct = async (req, resp = response) => {
    const id = req.params.id;
    const {status, user, ...rest} = req.body
    if (rest.name) rest.name = rest.name.toUpperCase()
    rest.user = req.user._id
    const product = await Product.findByIdAndUpdate(id, rest)
    resp.json({ msg: "Put API - controller", product });
}

// DELETE CATEGORY(status:false)
const deleteProduct = async(req, resp) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, {status:false})
    resp.json(product) 
}

module.exports = {
    createProduct, getOneProduct, getProducts, updateProduct,deleteProduct
}

