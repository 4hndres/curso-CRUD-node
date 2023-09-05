const {Schema, model} = require('mongoose')
const CategorySchema =  Schema({
    name: {
        type: String,
        required: [true, 'You must type a category'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

// Sobrescribimos el metodo toObject de para NO devolver 
// el objeto password y __v al crear un user en la bd 
CategorySchema.methods.toJSON = function(){
    const {__v, status, ...category} = this.toObject()
    return category
}


module.exports = model('Category', CategorySchema)