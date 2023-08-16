const Role = require("../models/role");
const user = require("../models/user");

const validateRole = async (role = "") => {
  const RoleExists = await Role.findOne({ role });
  if (!RoleExists) throw new Error("The role specified does not exists!!!");
};

// Verificar si el correo existe
const validateEmail = async (email = "") => {
  const emailExists = await user.findOne({ email });
  if (emailExists) throw new Error("That email is registed already!!!");
    // return res.status(400).json({ msg: "That emai is registed already!!!" });
};

// Verificar si el id existe
const validateId = async (id = "") => {
  const idExists = await user.findById( id );
  if (!idExists) throw new Error("The sended id does not exists!!!");
};

module.exports = { validateRole, validateEmail, validateId };
