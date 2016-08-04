var stompit = require('stompit');
var jwt = require('jsonwebtoken');

var server1 = {
    'host': '192.168.1.172',
    'port': 61613,
    'connectHeaders':{
        'host': '',
        'login': '',
        'passcode': ''
    }
};

var server2 = {
    'host': '192.168.1.172',
    'port': 61613,
    'connectHeaders':{
        'heart-beat': '5000,5000',
        'host': '',
        'login': '',
        'passcode': ''
    }
};

var servers = [server1, server2];

var reconnectOptions = {
    'maxReconnects': 10
};
var manager = new stompit.ConnectFailover(servers, reconnectOptions);
manager.connect(function(error, client, reconnect) {

    if (error) {
        console.log('connect error ' + error.message);
        return;
    }
    client.on('error', function(error){
        console.error('STOMP_ERROR:' + error.message);
        reconnect();
    });
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
            var isJson = IsJsonString(body);
            if(isJson){
                var receive_mq_data = JSON.parse(body);
                var token = receive_mq_data.token;
                var decode_token = jwt.decode(token);
                console.log(decode_token);
            }
            client.ack(message);
        });

    });
});

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
