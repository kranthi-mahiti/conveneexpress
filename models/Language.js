const mongoose = require('mongoose');

const LanguageSchema = mongoose.Schema({
    language: {
        type: String,
        trim: true
    },
    language_json:{
        type:String,
    },
    device_from: {
        type: String,
    },
    modified_date: {
        type: Date,
        default: Date.now()
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});
const Language = mongoose.model('Language', LanguageSchema);

module.exports = Language;