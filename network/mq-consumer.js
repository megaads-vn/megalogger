var stompit = require('stompit');
var jwt = require('jsonwebtoken');

var connectOptions = {
    'host': '192.168.11.17',
    'port': 61613,
    'connectHeaders':{
        'host': '/',
        'login': 'admin',
        'passcode': 'admin',
        'heart-beat': '5000,5000'
    }
};

stompit.connect(connectOptions, function(error, client, reconnect) {

    if (error) {
        console.log('connect error ' + error.message);
        return;
    }

    client.on('error', function(error){
        console.error('STOMP_ERROR:' + error.message);
        reconnect();
    });

    // var sendHeaders = {
    //     'destination': '/queue/test',
    //     'content-type': 'text/plain'
    // };
    //
    // var frame = client.send(sendHeaders);
    // frame.write('hello');
    // frame.end();

    var subscribeHeaders = {
        'destination': '/queue/logger',
        'ack': 'client-individual'
    };

    client.subscribe(subscribeHeaders, function(error, message) {

        if (error) {
            console.log('subscribe error ' + error.message);
            return;
        }

        message.readString('utf-8', function(error, body) {
            if (error) {
                console.log('read message error ' + error.message);
                return;
            }
            var receive_mq_data = JSON.parse(body);
            console.log(receive_mq_data.type);
           // if(receive_mq_data.type == 'request'){
           //      console.log("REQUEST_QUEUEs");
              //  var token = jwt.sign({ api_key: receive_mq_data.token }, 'shhhhh', { expiresIn: 60 });
              //  var response = {};
              //  response.token=token;
              //  response.type = 'response';
             //   sendResponse(client, response, '/queue/test');
                client.ack(message);
         //   }
        });

    });
});

// function sendResponse(client, resppone, queue){
//     var sendHeaders = {
//         'destination': queue,
//         'content-type': 'application/json'
//     };
//     var frame = client.send(sendHeaders);
//     frame.write(JSON.stringify(resppone));
//     frame.end();
// }
//
// function verifyToken(jwt, mq_data){
//     var response = {};
//     var token = mq_data.token;
//     try{
//         var decode = jwt.verify(token, 'shhhhh');
//         response.status = 'successful';
//     }catch (error){
//         response.status = 'failed';
//     }
//     JSON.stringify(response);
// }
