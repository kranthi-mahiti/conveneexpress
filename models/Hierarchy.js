const mongoose = require('mongoose');

const HierarchySchema = mongoose.Schema({
    active: {
        type: String,
        trim: true
    },
    location_type:{
        type:String,
        trim:true
    },
    name:{
        type:String,
        trim:true
    },
    location_id:{
        type:String,
        trim:true
    },
    location_parent_id:{
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
const Hierarchy = mongoose.model('Locations', HierarchySchema);

module.exports = Hierarchy;