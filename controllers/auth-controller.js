const { response } = require("express");
const User = require('../models/user')
const bcrypt = require('bcryptjs'); 
const { generateJWT } = require("../helpers/generate-jwt");

const  login = async(req, resp = response) => {

    const  {email, password} = req.body

    try {

        // Verify if email exists
        const user = await User.findOne({email})
        if(!user){
            return resp.status(400).json({msg: 'The Email or password are incorrect!!!'})
        }

        // Verify if user got it's status true
        if(!user.status){
            return resp.status(400).json({msg: 'The email provided is not registered!!!'})
        }

        // Verifiy password
        const validPws = bcrypt.compareSync(password, user.password)
        if(!validPws){
            return resp.status(400).json({msg: 'The email or Password are incorrect!!!'})
        }

        // Generate JWT
        const token = await generateJWT(user.id)

        resp.json({
            user,
            token
        })        

    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            msg: 'Something is wrong, please stand by'
        })
    }

}


module.exports = {
    login
}