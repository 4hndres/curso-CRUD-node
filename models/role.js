const {Schema, model} = require('mongoose')
const RoleSchema =  Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligartorio']
    }
})


module.exports = model('Role', RoleSchema)