const mongoose = require('mongoose');

const ClubSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    photos: {
        type: Array
    },
    schedule: {
        type: Array
    }
})

module.exports = mongoose.model('Club',ClubSchema);