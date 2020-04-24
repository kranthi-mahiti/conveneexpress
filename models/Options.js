// "id": 1,
//     "active": 2,
//     "language_id": 2,
//     "skip_code": "0",
//     "score": 0,
//     "question_pid": 2,
//     "is_answer": "true",
//     "option_text": "Banglore",
//     "option_type": "Spinner",
//     "option_type_code": 2,
//     "updated_time": "2019-12-11 11:55:07.500415"


const mongoose = require('mongoose');

const OptionsSchema = mongoose.Schema({
    options_id: {
        type: Number,
    },
    active: {
        type: Number,
    },
    language_id: {
        type: Number,   
    },
    skip_code:{
        type:String,
        trim:true
    },
    score:{
        type:String,
        trim:true
    },
    question_pid:{
        type:Number,
    },
    is_answer:{
        type:String,
        trim:true
    },
    option_text:{
        type:String,
        trim:true
    },
    option_type:{
        type:String,
        trim:true
    },
    option_type_code:{
        type:Number,
        trim:true
    },
    updated_time: {
        type: Date,
        default: Date.now()
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
const Options = mongoose.model('Options', OptionsSchema);

module.exports = Options;
