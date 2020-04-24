const mongoose = require('mongoose');
//"{\n" +
//     "    \"status\": 2,\n" +
//     "    \"can_show_periodicity\": 1,\n" +
//     "    \"can_show_empty_ans\": 1,\n" +
//     "    \"is_activity_module_required\": 0,\n" +
//     "    \"is_tile_required\": 1,\n" +
//     "    \"can_show_activity_in_direct_flow\": 1,\n" +
//     "    \"app_code\": \"akrspi\",\n" +
//     "    \"is_gps_mandatory\": 0,\n" +
//     "    \"is_draft_required\": 1,\n" +
//     "    \"is_filter_required\": 1,\n" +
//     "    \"can_show_category\": 0,\n" +
//     "    \"message\": \"success\",\n" +
//     "    \"is_beneficiary_module_required\": 1,\n" +
//     "    \"is_training_required\": 0,\n" +
//     "    \"is_project_module_required\": 0,\n" +
//     "    \"training_module\": {},\n" +
//     "    \"is_search_required\": 1,\n" +
//     "    \"is_summary_view_required\": 1,\n" +
//     "    \"can_continue_activity\": 0,\n" +
//     "    \"app_lang\":\"en\",\n" +
//     "    \"can_show_question_code\": 0\n" +
//     "}";
const ConfigurationSchema = mongoose.Schema({
        status: {
            type: Boolean,
        },
        can_show_periodicity: {
            type: Boolean,
        },
        can_show_empty_ans: {
            type: Boolean,
        },
        login_type: {
            type: Number,
        },
        is_activity_module_required: {
            type: Boolean,
        }
        ,
        is_tile_required: {
            type: Boolean,
        }
        ,
        can_show_activity_in_direct_flow: {
            type: Boolean,
        }
        ,
        app_code: {
            type: String,
        }
        ,
        is_gps_mandatory: {
            type: Boolean,
        }
        ,
        is_draft_required: {
            type: Boolean,
        }
        ,
        is_filter_required: {
            type: Boolean,
        }
        ,
        can_show_category: {
            type: Boolean,
        }
        ,
        message: {
            type: String,
        }
        ,
        is_beneficiary_module_required: {
            type: Boolean,
        }
        ,
        is_training_required: {
            type: Boolean,
        }
        ,
        is_project_module_required: {
            type: Boolean,
        }
        ,
        training_module: {
            type: String,
            default:
                '{}'
        }
        ,
        is_search_required: {
            type: Boolean,
        }
        ,
        is_summary_view_required: {
            type: Boolean,
        }
        ,
        can_continue_activity: {
            type: Boolean,
        }
        ,
        app_lang: {
            type: String,
            default:
                'en'
        }
        ,
        can_show_question_code: {
            type: Boolean,
        }
        ,
        modified_date: {
            type: Date,
            default:
                Date.now()
        }
        ,
        created_date: {
            type: Date,
            default:
                Date.now()
        }
    })
;
const Configurations = mongoose.model('configuration', ConfigurationSchema);

module.exports = Configurations;