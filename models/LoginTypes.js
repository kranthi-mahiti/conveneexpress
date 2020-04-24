const mongoose = require('mongoose');
const LoginTypesSchema = mongoose.Schema({
        login_type_name: {
            type: String
        },
        login_type_id: {
            type: Number,
            default: 1
        },
        modified_date: {
            type: Date,
            default:
                Date.now()
        },
        created_date: {
            type: Date,
            default:
                Date.now()
        }
    })
;
const LoginTypes = mongoose.model('LoginTypes', LoginTypesSchema);

module.exports = LoginTypes;