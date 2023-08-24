const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')
    
    if(!token)
        return res.status(401).json({msg: 'There is no token on the request!!!'})
    
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        // get authenticated user owner of the uid
        const user = await User.findById(uid)

        if(!user)
        return res.status(401).json({msg: 'Invalid Token, the user doesnt exists!!!'})

        // verify if the user has a true status
        if(!user.status)
            return res.status(401).json({msg: 'Invalid Token, you cannot delete users!!!'})

        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({msg: 'Invalid token!!!'})
    }
}

module.exports = {
    validateJWT
}