const mongoose = require('mongoose');

const ThrottleSchema = mongoose.Schema({
    type_of_network: {
        type: String,
        trim: true
    },
    device_from: {
        type: String,
    },
    modified_date: {
        type: Date,
        default:Date.now()
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});
const Throttle = mongoose.model('Throttle', ThrottleSchema);

module.exports = Throttle;