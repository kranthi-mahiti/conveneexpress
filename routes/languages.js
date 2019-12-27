var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let middleware = require('../middleware/auth');
/* GET users listing. */
const {base64encode, base64decode} = require('nodejs-base64');

const Langauge = require('../models/Language');

router.post('/language', middleware.checkToken, function (req, res) {
    let languageCode = req.body.languagecode;
    res.setHeader('Content-Type', 'application/json');
    Langauge.findOne({language: languageCode}, function (err, language) {
        if (err) return res.status(500).send('Error on the server.');
        if (!language) return res.status(404).send("language does not found");

        res.status(200).json(JSON.parse(language.language_json));
    })


    // if (languageCode.toString().trim() === 'english') {
    //     res.status(200).json({
    //         "en": {
    //             success: true,
    //             title: "hi",
    //             subtitle: "how are you",
    //             button: "button"
    //         }
    //     });
    // } else {
    //     res.status(200).json({
    //         "en": {
    //             success: true,
    //             title: "hi",
    //             subtitle: "how are you",
    //             button: "button"
    //         }
    //     });
    // }

});
router.post('/createlangauge', middleware.checkToken, function (req, res) {
    let languageCode = req.body.languagecode;
    res.setHeader('Content-Type', 'application/json');
    Langauge.create({
        language:req.body.languagecode,
        language_json:req.body.language_json,
        device_from:'',
    }, function (err, language) {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).json({
            success:true,
            message:"language created successfully"
        });
    });
});

module.exports = router;