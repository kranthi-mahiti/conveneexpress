var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/user');
var ConfigurationRouter = require('./routes/configurations');
var TelemetryRouter = require('./routes/telemetry');
var ConveneRouter = require('./routes/convene');
var LanguageRouter = require('./routes/languages');
const db = require('./config/configurations');
const mongoose = require("mongoose");
var app = express();
var amqp = require('amqplib/callback_api');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// var amqp = require('amqp');
// var connection = amqp.createConnection({url: db.RabbitmqUrl, debug: true}, {defaultExchangeName: ''});
// // var queue = connection.queue(db.QueueName, {durable: true});
// // var exchange = connection.exchange(db.ExchangeName, {durable: true, type: db.ExchangeType, confirm: true});
//
// connection.on('ready', function () {
//     console.log('Rabbit MQ connected');
// });
// connection.on('error', function () {
//     console.log('error on connection')
// });
amqp.connect(db.RabbitmqUrl, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        if(connection!='undefined')
            console.log('Rabbit MQ Connected');

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertQueue(db.QueueName);
        const msg = 'application started';
        channel.sendToQueue(db.QueueName, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
});
mongoose.connect(db.MongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/configuration', ConfigurationRouter);
app.use('/telemetry', TelemetryRouter);
app.use('/convene', ConveneRouter);
app.use('/language', LanguageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
