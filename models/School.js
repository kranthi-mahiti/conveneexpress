const mongoose = require('mongoose');

const SchoolScheme = mongoose.Schema({
    school_id:{
        type:Number,
    },
    school_name:{
        type:String,
        trim:true
    },
    village_name:{
        type:String,
        trim:true
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
const School = mongoose.model('School', SchoolScheme);

module.exports = School;