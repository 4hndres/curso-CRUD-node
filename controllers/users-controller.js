const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const GetUsers = async (req, res = response) => {
  const { lim = 5, from = 0 } = req.query;
  const query = { status: true };

//   const users = await User.find(query).skip(Number(from)).limit(Number(lim));
//   const total = await User.countDocuments(query);
//   res.json({ total, users });

    const [total, users] = await Promise.all([
    await User.countDocuments(query),
    await User.find(query).skip(Number(from)).limit(Number(lim))
  ]);
   
  res.json({ total, users });

};

const PutUsers = async (req, res = response) => {
  const id = req.params.userId;
  const { _id, password, google, email, ...rest } = req.body;

  // TODO validate id against bd

  if (password) {
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);

  res.status(500).json({ msg: "Put API - controller", user });
};

const PostUsers = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // guardar en BD
  await user.save();

  res.status(201).json({ msg: "Post API - controller", user });
};

const DeleteUsers = async(req, res = response) => {
    const {userId} = req.params
    const uid = req.uid
    // Physical deleting
    // const user = await User.findByIdAndDelete(userId)
    const user =  await User.findByIdAndUpdate(userId, {status:false})
    // const authenticatedUser = req.user 
    // res.json({ user, authenticatedUser });
    res.json({ user});
};

const PatchUsers = (req, res = response) => {
  res.json({ msg: "Patch API - controller" });
};

module.exports = {
  GetUsers,
  PutUsers,
  PostUsers,
  DeleteUsers,
  PatchUsers,
};
