const {Schema, model} = require('mongoose')
const productSchema =  Schema({
    name: {
        type: String,
        required: [true, 'You must type a product'],
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
    },
    price: {
        type: Number,
        default: 0
    },
    categorie:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {type: String},
    available: {type: Boolean, default: true}
})

// Sobrescribimos el metodo toObject de para NO devolver 
// el objeto password y __v al crear un user en la bd 
productSchema.methods.toJSON = function(){
    const {__v, status, ...product} = this.toObject()
    return product
}


module.exports = model('Product', productSchema)