var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const config = require("../config");
let jwt = require('jsonwebtoken');
let middleware = require('../middleware/auth');

const TelemetryResponse="";
router.use(bodyParser.urlencoded({extended: false}));
router.get('/',middleware.checkToken, function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(TelemetryResponse);
});


const EventResponse="{\n" +
    "\t\"succees\":true,\n" +
    "\t\"message\":\"Event recorded\"\n" +
    "}";


router.post('/events',middleware.checkToken,function (req,res,next) {
    var eventype=req.body.event;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(EventResponse);
});


module.exports = router;