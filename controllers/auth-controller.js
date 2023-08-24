const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return resp
        .status(400)
        .json({ msg: "The Email or password are incorrect!!!" });
    }

    // Verify if user got it's status true
    if (!user.status) {
      return resp
        .status(400)
        .json({ msg: "The email provided is not registered!!!" });
    }

    // Verifiy password
    const validPws = bcrypt.compareSync(password, user.password);
    if (!validPws) {
      return resp
        .status(400)
        .json({ msg: "The email or Password are incorrect!!!" });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    resp.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Something is wrong, please stand by",
    });
  }
};

const googleSignIn = async (req, resp = response) => {
  const { id_token } = req.body;
  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });
    // We've gotta create it
    if (!user) {
      const data = {
        name,
        email,
        password: ":p",
        img: picture,
        google: true,
      };
      user = new User(data)
      await user.save();
    }

    // If the user on DB got google on false
    if (!user.status) {
      return resp
        .status(401)
        .json({ msg: "User blocked!!!, Please contact the admin " });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    resp.json({ user, token });
  } catch (error) {
    resp.status(400).json({ msg: "The token couldnt be verified!!!" });
  }
};

module.exports = {
  login,
  googleSignIn,
};
