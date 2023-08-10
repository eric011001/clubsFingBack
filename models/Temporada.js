const mongoose = require('mongoose');

const TemporadaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    registro: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Temporada', TemporadaSchema);
