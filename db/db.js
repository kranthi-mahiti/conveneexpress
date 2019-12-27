const mongoose = require('mongoose');
const key=require('../config/configurations');


mongoose.connect(key.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
});