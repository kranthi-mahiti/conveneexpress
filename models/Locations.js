const mongoose = require('mongoose');

const HierarchySchema = mongoose.Schema({
    active: {
        type: Boolean
    },
    collection_type:{
        type:String,
        trim:true
    },
    name:{
        type:String,
        trim:true
    },
    id:{
        type:String,
        trim:true
    },
    parent_id:{
        type:String,
        trim:true
    },
    level_name:{
        type:String,
        trim:true
    },
    type:{
        type:String,
        trim:true
    },
    tag:{
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
const Locations = mongoose.model('Locations', HierarchySchema);

module.exports = Locations;