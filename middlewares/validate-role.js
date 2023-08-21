const { response, request } = require("express")


const validateAdminRole = (req = request, resp = response, next ) => {

    if(!req.user)
        return resp.status(500).json({msg: 'You must validate your Token fisrt!!!'})

    const {role, name} = req.user
    if(role !== 'ADMIN_ROLE')
        return resp.status(401).json({msg: `the user ${name} do not have permission to do this!!!`})

    next()
}

const  hasRole = (...roles) => {
    return (req, resp = response, next) => {
        if(!req.user)
            return resp.status(500).json({msg: 'You must validate your Token fisrt!!!'})
        if(!roles.includes(req.user.role))
        return resp.status(401).json({msg: `The current service requires one of this roles ${roles}!!!`})
        next()
    }
}

module.exports = {
    validateAdminRole,
    hasRole
}