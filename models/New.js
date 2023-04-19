const mongoose = require('mongoose');

const NewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ('Club')
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ('Usuario')
    }

});

module.exports = mongoose.model('New',NewSchema);