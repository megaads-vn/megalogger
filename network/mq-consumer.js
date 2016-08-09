var stompit = require('stompit');
var jwt = require('jsonwebtoken');
var config = require(__dir + "/core/app/config");
var logService = require(__dir + "/services/log-service");
var servers = [config.get('connections.primaryServer'), config.get('connections.backupServer')];
var reconnectOptions = {
    'maxReconnects': 10
};
var manager = new stompit.ConnectFailover(servers, reconnectOptions);

manager.connect(function(error, client, reconnect) {
    console.log("===== Start Listen Queue ====");
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
                var split_decode = decode_token.aud.split('_');
                var logData = {
                        userId:split_decode[0],
                        title: 'Test From MQ',
                        source: receive_mq_data.source,
                        level: receive_mq_data.level,
                        meta: receive_mq_data.meta,
                        data: receive_mq_data.data
                };
                //console.info(logData);
                logService.create(logData, function(err, data){
                    if(err == null){
                        console.log("USER_ID:"+data.userId + ";TITLE:"+data.title);
                    }else{
                        console.log("ERROR:"+error);
                    }

                });
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
