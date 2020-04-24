var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let middleware = require('../middleware/auth');
var faker = require('faker');
/* GET users listing. */
const {base64encode, base64decode} = require('nodejs-base64');

const Hierarchy = require('../models/Locations');

router.post('/locations', middleware.checkToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Hierarchy.find({}, function (err, locations) {
        if (err) return res.status(500).send('Error on the server.');
        if (!locations) return res.status(404).send("language does not found");

        res.status(200).json({
            status:true,
            recallApi:true,
            message:"succesfully retrived locations",
            hierarchy:
             locations
            }
        );
    })
});
router.post('/createLocations', middleware.checkToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Hierarchy.create({
        active: req.body.active,
        location_type: req.body.location_type,
        name: req.body.name,
        location_id: req.body.location_id,
        location_parent_id: req.body.location_parent_id
    }, function (err, location) {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).json({
            success: true,
            message: "locations added successfully"
        });
    });
});

router.post('/createFakeLocations', middleware.checkToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Hierarchy.create({
        active: "2",
        location_type: "State",
        name: faker.address.state(),
        location_id: faker.random.number(),
        location_parent_id: "1"
    }, function (err, location) {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).json({
            success: true,
            message: "locations added successfully"
        });
    });
});

module.exports = router;