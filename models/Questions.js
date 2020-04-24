// "id": 1,
//     "active": 2,
//     "lang_ID": 2,
//     "ans_type": "Text",
//     "ans_type_code": 1,
//     "mandatory": 2,
//     "updated_time": "2019-12-11 11:55:07.500415",
//     "help_text": "",
//     "question_text": "Enter your name"
const mongoose = require('mongoose');

const QuestionsSchema = mongoose.Schema({
    question_id: {
        type: Number,
    },
    active: {
        type: Number,
    },
    lang_ID: {
        type: Number,
    },
    ans_type: {
        type: String,
        trim: true
    },
    ans_type_code: {
        type: Number,
    },
    mandatory: {
        type: Number,
        default: 2
    },
    question_text: {
        type: String,
        trim: true
    },
    help_text: {
        type: String,
        trim: true
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
const Questions = mongoose.model('Questions', QuestionsSchema);

module.exports = Questions;
