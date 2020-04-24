var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var faker = require('faker');
const config = require("../config/configurations");
let jwt = require('jsonwebtoken');
let middleware = require('../middleware/auth');
var User = require('../models/User');
var Questions = require('../models/Questions');
var Options = require('../models/Options');
var School = require('../models/School');
const Throttle = require('../models/Throttle');
const Telemetry = require('../models/Telemetry');
const Hierarchy = require('../models/Locations');
const Langauge = require('../models/Language');
const Configuration = require('../models/Configuration');
const LoginTypes = require('../models/LoginTypes');
var response_success_user_login_json = "{\n" +
    "  \"status\": 2,\n" +
    "  \"message\": \"Logged in Success\",\n" +
    "  \"user_data\": [{\n" +
    "    \"name\": \"Aryan\",\n" +
    "    \"mobile_number\": \"8800542737\",\n" +
    "    \"username\": \"aryan@123\",\n" +
    "    \"profile_img\":\"\",\n" +
    "    \"user_id\": 100,\n" +
    "    \"role_name\": \"Teacher\",\n" +
    "    \"role_id\": 1,\n" +
    "    \"email\": \"teacher@gmail.com\",\n" +
    "    \"activeStatus\": 2,\n" +
    "    \"partner_id\": 143,\n" +
    "    \"updates\": 60,\n" +
    "    \"master_data_file_url\":\"\",\n" +
    "    \"location_based\": 0,\n" +
    "    \"login_type\": 0\n" +
    "  }],\n" +
    "  \"app_data\":[ {\n" +
    "    \"forceLogout\": 0,\n" +
    "    \"updateMessage\": \"New update available, download from playstore\",\n" +
    "    \"link\": \"\",\n" +
    "    \"forceUpdate\": \"False\",\n" +
    "    \"appVersion\": 2\n" +
    "  } ]\n" +
    "}";
var fail_response = "{\n" +
    "  \"status\": 0,\n" +
    "  \"message\": \"Logged in Failure\",\n" +
    "  \"token\": \"\",\n" +
    "  \"endpoint\": \"\",\n" +
    "  \"user_data\": [],\n" +
    "  \"app_data\":[]\n" +
    "}";
const ConfigurationJson = "{\n" +
    "    \"status\": 2,\n" +
    "    \"can_show_periodicity\": 1,\n" +
    "    \"can_show_empty_ans\": 1,\n" +
    "    \"is_activity_module_required\": 0,\n" +
    "    \"is_tile_required\": 1,\n" +
    "    \"can_show_activity_in_direct_flow\": 1,\n" +
    "    \"app_code\": \"akrspi\",\n" +
    "    \"is_gps_mandatory\": 0,\n" +
    "    \"is_draft_required\": 1,\n" +
    "    \"is_filter_required\": 1,\n" +
    "    \"can_show_category\": 0,\n" +
    "    \"message\": \"success\",\n" +
    "    \"is_beneficiary_module_required\": 1,\n" +
    "    \"is_training_required\": 0,\n" +
    "    \"is_project_module_required\": 0,\n" +
    "    \"training_module\": {},\n" +
    "    \"is_search_required\": 1,\n" +
    "    \"is_summary_view_required\": 1,\n" +
    "    \"can_continue_activity\": 0,\n" +
    "    \"app_lang\":\"en\",\n" +
    "    \"can_show_question_code\": 0\n" +
    "}";
const EventResponse = "{\n" +
    "\t\"succees\":true,\n" +
    "\t\"message\":\"Event recorded\"\n" +
    "}";


router.post('/register', function (req, res) {

    // var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var name = req.body.username;
    var email = req.body.email;
    User.create({
            username: name,
            email: email,
            password: req.body.password,
            token: '',
            response: req.body.response
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.");
            // create a token
            var token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({
                auth: true,
                token: token,
                username: name,
                email: email,
                success: true,
                message: 'user created successfully'
            });
        });
});

router.post('/login', function (req, res) {
    console.log(req.body); // the posted data
    User.findOne({username: req.body.username, password: req.body.password}, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send(JSON.parse(fail_response));
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 * 365 // expires in 24 hours
        });
        console.log(token);

        res.status(200).json(JSON.parse(user.response));
        // res.status(200).send(response_success_user_login_json)
    });
});
router.post('/logintypes',  function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    LoginTypes.findOne({
        login_type_id: req.body.login_type_id
    }, function (err, logintypes) {
        if (err) return res.status(500).send("There was a problem in the server");
        res.status(200).json({
            "success": true,
            "message": "logintypes listed",
            "loginType": logintypes.login_type_name
        });
    });
});
router.get('/alllogintypes',  function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    LoginTypes.find({
    }, function (err, logintypes) {
        if (err) return res.status(500).send("There was a problem in the server");
        res.status(200).json({
            "success": true,
            "message": "logintypes listed",
            "data": logintypes
        });
    });
});
router.post('/createlogintypes',  function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    LoginTypes.create({
        login_type_id: req.body.login_type_id,
        login_type_name: req.body.login_type_name

    }, function (err, logintypes) {
        if (err) return res.status(500).send("There was a problem in the server");
        res.status(200).json({
            "success": true,
            "message": "logintypes listed",
            "loginType": logintypes.login_type_name
        });
    });
});

router.post('/configuration',  function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    Configuration.findOne({app_code: req.body.app_code}, function (err, configuration) {
        if (err) return res.status(500).send("There was a problem in the server");
        res.status(200).json({
            "success": true,
            "status": true,
            "can_show_periodicity": true,
            "can_show_empty_ans": true,
            "is_activity_module_required": true,
            "is_tile_required": true,
            "can_show_activity_in_direct_flow": true,
            "app_code": configuration.app_code,
            "login_type": configuration.login_type,
            "is_gps_mandatory": true,
            "is_draft_required": true,
            "is_filter_required": true,
            "can_show_category": true,
            "message": "success",
            "is_beneficiary_module_required": true,
            "is_training_required": true,
            "is_project_module_required": true,
            "training_module": "",
            "is_search_required": true,
            "is_summary_view_required": true,
            "can_continue_activity": true,
            "app_lang": configuration.app_lang,
            "can_show_question_code": true
        });
    });
});
router.post('/createconfiguration',  function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    Configuration.create(
        {
            "status": true,
            "can_show_periodicity": true,
            "can_show_empty_ans": true,
            "is_activity_module_required": true,
            "is_tile_required": true,
            "can_show_activity_in_direct_flow": true,
            "app_code": req.body.app_code,
            "login_type": req.body.login_type,
            "is_gps_mandatory": true,
            "is_draft_required": true,
            "is_filter_required": true,
            "can_show_category": true,
            "message": "success",
            "is_beneficiary_module_required": true,
            "is_training_required": true,
            "is_project_module_required": true,
            "training_module": "",
            "is_search_required": true,
            "is_summary_view_required": true,
            "can_continue_activity": true,
            "app_lang": req.body.app_lang,
            "can_show_question_code": true
        }, function (err, configuration) {
            if (err) return res.status(500).send("There was a problem in the server");
            res.status(200).json({
                "success": true,
                "message": "Configurations created",
                "appcode": configuration.appcode
            });
        }
    );
});
router.post('/throttle', middleware.checkToken, function (req, res) {
    console.log(req.body.typeofnetwork); // the posted data
    res.setHeader('Content-Type', 'application/json');
    Throttle.create(
        {
            type_of_network: req.body.typeofnetwork,
            device_from: '',
        }, function (err, throttle) {
            if (err) return res.status(500).send("There was a problem in the server");
            res.status(200).json({
                "success": true,
                "message": "network connectivity",
                "network": req.body.typeofnetwork
            });
        }
    );
});
router.post('/events', middleware.checkToken, function (req, res, next) {
    var eventype = req.body.event;
    Telemetry.create({
            events: eventype,
            device_from: ''
        }, function (err, telemetry) {
            if (err) return res.status(500).send("There was a problem registering the user.");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(EventResponse);
        }
    );
});
router.post('/questions', middleware.checkToken, function (req, res) {
    console.log(req.body); // the posted data
    Questions.find({}, function (err, questions) {
        if (err) return res.status(500).send('Error on the server.');
        if (!questions) return res.status(404).json({
            "status": 0,
            "message": "Question not found"
        });
        console.log(questions);
        res.status(200).json(
            {
                Question: questions
            }
        );
    });
});

router.post('/createquestion', middleware.checkToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Questions.create({
        question_id: req.body.question_id,
        active: req.body.active,
        lang_ID: req.body.lang_ID,
        ans_type: req.body.ans_type,
        ans_type_code: req.body.ans_type_code,
        mandatory: req.body.mandatory,
        updated_time: req.body.updated_time,
        question_text: req.body.question_text,
        help_text: req.body.help_text,
    }, function (err, question) {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).json({
            success: true,
            message: "question added successfully"
        });
    });
});
router.post('/options', middleware.checkToken, function (req, res) {
    console.log(req.body); // the posted data
    Options.find({}, function (err, options) {
        if (err) return res.status(500).send('Error on the server.');
        if (!options) return res.status(404).json({
            "status": 0,
            "message": "Options not found"
        });
        console.log(options);
        res.status(200).json(
            {
                Options: options
            }
        );
    });
});

router.post('/createoptions', middleware.checkToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Options.create({
        options_id: req.body.options_id,
        active: req.body.active,
        language_id: req.body.language_id,
        skip_code: req.body.skip_code,
        score: req.body.score,
        question_pid: req.body.question_pid,
        is_answer: req.body.is_answer,
        option_text: req.body.option_text,
        option_type: req.body.option_type,
        option_type_code: req.body.option_type_code,
        updated_time: req.body.updated_time
    }, function (err, question) {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).json({
            success: true,
            message: "options added successfully"
        });
    });
});
router.post('/schools', middleware.checkToken, function (req, res) {
    console.log(req.body); // the posted data
    School.find({}, function (err, schools) {
        if (err) return res.status(500).send('Error on the server.');
        if (!schools) return res.status(404).json({
            "status": 0,
            "message": "schools not found"
        });
        console.log(schools);
        res.status(200).json(
            {
                status: 2,
                message: "Successfully fetched the schools",
                data: schools
            }
        );
    });
});

router.post('/createschool', middleware.checkToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    School.create({
        school_id: req.body.school_id,
        school_name: req.body.school_name,
        village_name: req.body.village_name
    }, function (err, school) {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).json({
            success: true,
            message: "schools added successfully"
        });
    });
});


router.post('/locations', middleware.checkToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Hierarchy.find({}, function (err, locations) {
        if (err) return res.status(500).send('Error on the server.');
        if (!locations) return res.status(404).send("language does not found");

        res.status(200).json({
                status: true,
                recallApi: true,
                message: "succesfully retrived locations",
                data:
                locations
            }
        );
    })
});
router.post('/createlocations', middleware.checkToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Hierarchy.create({
        collection_type: req.body.collection_type,
        active: req.body.active,
        modified_date: req.body.modified_date,
        parent_id: req.body.parent_id,
        id: req.body.id,
        name: req.body.name,
        level_name: req.body.level_name,
        type: req.body.type,
        tag: req.body.tag
    }, function (err, location) {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).json({
            success: true,
            message: "locations added successfully"
        });
    });
});

router.post('/createfakelocations', middleware.checkToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Hierarchy.create({
        collection_type: "locations",
        active: 1,
        modified_date: "2019-12-31T19:40:00.000Z",
        parent_id: "0",
        id: faker.random.number(),
        name: faker.address.state(),
        level_name: "state",
        type: "type",
        tag: "tag"

        // active: "2",
        // location_type: "State",
        // name: faker.address.state(),
        // location_id: faker.random.number(),
        // location_parent_id: "1"
    }, function (err, location) {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).json({
            success: true,
            message: "locations added successfully"
        });
    });
});

router.post('/language', middleware.checkToken, function (req, res) {
    let languageCode = req.body.languagecode;
    res.setHeader('Content-Type', 'application/json');
    Langauge.findOne({language: languageCode}, function (err, language) {
        if (err) return res.status(500).send('Error on the server.');
        if (!language) return res.status(404).send("language does not found");

        res.status(200).json(JSON.parse(language.language_json));
    })


});
router.post('/createlangauge', middleware.checkToken, function (req, res) {
    let languageCode = req.body.languagecode;
    res.setHeader('Content-Type', 'application/json');
    Langauge.create({
        language: req.body.languagecode,
        language_json: req.body.language_json,
        device_from: '',
    }, function (err, language) {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).json({
            success: true,
            message: "language created successfully"
        });
    });
});


module.exports = router;