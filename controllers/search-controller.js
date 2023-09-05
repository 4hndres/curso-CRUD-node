const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models/");

const allowedCollections = ["categories", "products", "roles", "users"];

const searchUsers = async (term = "", resp = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const user = await User.findById(term);
    return resp.json({
        results: (user) ? [user] : [] 
    });
  }

  const regex = new RegExp(term, 'i')
  const users = await User.find({$or:[{name: regex}, {email: regex}], $and:[{status: true}]})
  resp.json({
    // results: (users) ? [users] : [] 
    results: users
  });
};

const searchProducts = async(term = '', resp = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const products = await Product.findById(term).populate('categorie', 'name');
    return resp.json({
        results: (products) ? [products] : [] 
    });
  }

  const regex = new RegExp(term, 'i')
  const products = await Product.find({name: regex, status: true}).populate('categorie', 'name');
  resp.json({
    // results: (users) ? [users] : [] 
    results: products
  });
}

const searchCategories = async(term='', resp = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const categories = await Category.findById(term);
    return resp.json({
        results: (categories) ? [categories] : [] 
    });
  }

  const regex = new RegExp(term, 'i')
  const categories = await Category.find({name: regex, status: true})
  resp.json({
    // results: (users) ? [users] : [] 
    results: categories
  });
}

const search = (req, resp = response) => {
  const { collection, term } = req.params;
  if (!allowedCollections.includes(collection)) {
    resp.status(400).json({
      msg: `The allowed collections are: ${allowedCollections}`,
    });
  }

  switch (collection) {
    case "categories":
      searchCategories(term, resp)
      break;

    case "products":
      searchProducts(term, resp)
      break;

    case "users":
      searchUsers(term, resp);
      break;

    default:
      resp.status(500).json({
        msg: "You forgot to do this research",
      });
  }
};

module.exports = {
  search,
};
