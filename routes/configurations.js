var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const config = require("../config/configurations");
let jwt = require('jsonwebtoken');
let middleware = require('../middleware/auth');
/* GET users listing. */
const {base64encode, base64decode} = require('nodejs-base64');
const Throttle = require('../models/Throttle');

// var amqp = require('amqp');
// var connection = amqp.createConnection({url: "amqp://localhost"},{defaultExchangeName: ''});
// connection.on('ready', function() {
//     console.log('Rabbit MQ connected');
// });
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
    "    \"style_array\":\"style\",\n" +
    "    \"string_array\":\"#e00303\",\n" +
    "    \"app_lang\":\"en\",\n" +
    "    \"can_show_question_code\": 0\n" +
    "}";

const Response = "{" +
    "\"success\":1,\n" +
    "\"endpoint\":\"convene.com\",\n" +
    "\"applicationcode\":\"akrspi\",\n" +
    "\"message\":\"success\"\n" +
    "}";
const ErrorResponse = "{}";

router.get('/', middleware.checkToken, function (req, res, next) {
    connection.publish("convene", "hi");
    res.setHeader('Content-Type', 'application/json');
    res.send(ConfigurationJson);
});
router.use(bodyParser.urlencoded({extended: false}));

function ResponseAkrspi(userId, cb) {
    var Response = '';
    if (userId.toString().trim() === 'akrspi') {
        Response = "{" +
            "\"success\":1,\n" +
            "\"endpoint\":\"convene.com\",\n" +
            "\"applicationcode\":\"akrspi\",\n" +
            "\"message\":\"success\"\n" +
            "}";
    } else {
        Response = "{" +
            "\"success\":1,\n" +
            "\"endpoint\":\"convene.com\",\n" +
            "\"applicationcode\":\"akrspi1\",\n" +
            "\"message\":\"success\"\n" +
            "}";
    }
    cb(Response)
}

function authorization(username, password, cb) {
    var Response = '';
    let encoded = base64encode(username + password);
    if (username.toString().trim() === 'test' && password.toString().trim() === 'test') {
        Response = "{" +
            "\"success\":1,\n" +
            "\"endpoint\":\"convene.com\",\n" +
            "\"applicationcode\":\"akrspi\",\n" +
            "\"token\":\"dGVzdCt0ZXN0\",\n" +
            "\"message\":\"success\"\n" +
            "}";
    } else {
        Response = "{" +
            "\"success\":0,\n" +
            "\"endpoint\":\"\",\n" +
            "\"applicationcode\":\"\",\n" +
            "\"token\":\"\",\n" +
            "\"message\":\"failure\"\n" +
            "}";
    }
    cb(Response)
}

router.post('/convene', middleware.checkToken, function (req, res) {
    console.log(req.body); // the posted data
    res.setHeader('Content-Type', 'application/json');
    ResponseAkrspi(req.body.convene, function (Response) {
        res.send(Response);
    });
});
router.post('/throttle', middleware.checkToken, function (req, res) {
    console.log(req.body.typeofnetwork); // the posted data
    Throttle.create(
        {
            type_of_network: req.body.typeofnetwork,
            device_from: '',
        }, function (err, throttle) {
            if (err) return res.status(500).send("There was a problem registering the user.");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                "success": true,
                "message": "network connectivity",
                "network": req.body.typeofnetwork
            });
        }
    );

});

router.post('/authorization', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'test';
    let mockedPassword = 'test';

    if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
            let token = jwt.sign({username: username},
                config.secret,
                {
                    expiresIn: '48h' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                success: true,
                message: 'Authentication successful!',
                token: token,
                endpoint: 'convene.com',
                applicationcode: 'akrspi'
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
});




module.exports = router;
