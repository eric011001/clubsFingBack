const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ('Club')
    }
})

module.exports = mongoose.model('Usuario',UsuarioSchema);