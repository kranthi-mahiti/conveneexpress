var amqp = require('amqplib/callback_api');
const db=require('./config/configurations');

amqp.connect(db.RabbitmqUrl, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(db.QueueName);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", db.QueueName);

        channel.consume(db.QueueName, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});