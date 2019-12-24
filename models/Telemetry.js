const mongoose = require('mongoose');

const TelemetrySchema = mongoose.Schema({
    events: {
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
const Telemetry = mongoose.model('Telemetry', TelemetrySchema);

module.exports = Telemetry;