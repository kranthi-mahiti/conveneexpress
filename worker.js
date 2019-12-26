var amqp = require('amqplib/callback_api');
const CONN_URL ='amqp://localhost';
amqp.connect(CONN_URL, function (err, conn) {
    // console.log(conn);
    conn.createChannel(function (err, ch) {
        ch.consume('convene', function (msg) {
                console.log('.....');
                setTimeout(function(){
                    console.log("Message:", msg.content.toString());
                },4000);
            },{ noAck: true }
        );
    });
});