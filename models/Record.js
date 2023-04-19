const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    enrollment: {
        type: String,
        required: true,
        trim: true
    },
    career: {
        type: String,
        required: true,
        trim: true
    },
    semester: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ('Club')
    }
});

module.exports = mongoose.model('Record', RecordSchema);