const { response } = require("express");
const Category  = require("../models/categorie");


// GET CATEGORIES - PAGED - TOTAL OF DOCUMENTS - POPULATE(OBJ WITH USER INFO)
const getCategories = async (req, resp = response) => {
    const { lim = 5, from = 0 } = req.query;
    const query = {status: true}

    const [total, categories] = await Promise.all([
        await Category.countDocuments(query),
        await Category.find(query).populate('user', 'name').skip(Number(from)).limit(Number(lim))
    ])

    resp.json({total, categories})
}

// GET A CATEGORY - POPULATE(OBJ WITH USER INFO)
const getOneCategory = async (req, resp = response) => {
    const id = req.params.id;
    const category = await Category.findById(id).populate('user', 'name')
    resp.status(500).json({ msg: "Get API - controller", category });
}

// CREATE NEW CATEGORY
const createCategory = async(req,  resp = response) => {
    const name = req.body.name.toUpperCase()
    const categoryDB = await Category.findOne({name})
    if (categoryDB) 
        resp.status(400).json({msg: `The category ${categoryDB.name} already exists!!!`})

    // GENERATE DATA THAT WE'RE GOING TO STORE
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data)
    await category.save()
    resp.status(201).json(category)
}

// UPDATE CATEGORY
const updateCategory = async (req, resp = response) => {
    const id = req.params.id;
    const {status, user, ...rest} = req.body
    rest.name  = rest.name.toUpperCase()
    rest.user = req.user._id
    const category = await Category.findByIdAndUpdate(id, rest)
    resp.status(500).json({ msg: "Put API - controller", category });
}

// DELETE CATEGORY(status:false)
const deleteCategory = async(req, resp) => {
    const {id} = req.params
    const category = await Category.findByIdAndUpdate(id, {status:false})
    resp.json(category) 
}

module.exports = {
    createCategory, getCategories, getOneCategory, updateCategory, deleteCategory
}