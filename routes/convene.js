var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const config = require("../config/configurations");
let jwt = require('jsonwebtoken');
let middleware = require('../middleware/auth');
var User = require('../models/User');

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
        if (!user) return res.status(404).send(fail_response);
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json(JSON.parse(user.response));
        // res.status(200).send(response_success_user_login_json)
    });
    //         let token = jwt.sign({username: username},
    //             config.secret,
    //             {
    //                 expiresIn: '24h' // expires in 24 hours
    //             }
    //         );
    //         // return the JWT token for the future API calls
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json({
    //             success: true,
    //             message: 'Authentication successful!',
    //             token: token,
    //             endpoint: 'convene.com',
    //             applicationcode: 'akrspi'
    //         });
    //     } else {
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json({
    //             success: false,
    //             message: 'Incorrect username or password'
    //         });
    //     }
    // } else {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).json({
    //         success: false,
    //         message: 'Authentication failed! Please check the request'
    //     });
    // }
});


module.exports = router;