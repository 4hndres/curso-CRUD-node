const {Schema, model} = require('mongoose')

const userSchema = Schema({
    name :{
        type: String,
        required: [true, 'You must enter a name']
    },
    email :{
        type: String,
        required: [true, 'You must enter an email'],
        unique: true
    },
    password :{
        type: String,
        required: [true, 'You must enter a password']
    },
    img :{
        type: String
    },
    role :{
        type: String,
        required: [true, 'You must enter a role'],
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    status :{
        type: Boolean,
        default: true
    },
    google :{
        type: Boolean,
        default: false
    }
})

// Sobrescribimos el metodo toObject de para NO devolver 
// el objeto password y __v al crear un user en la bd 
userSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject()
    return user
}

module.exports = model('User', userSchema)