var stompit = require('stompit');
var jwt = require('jsonwebtoken');
var config = require(__dir + "/core/app/config");
var logService = require(__dir + "/services/log-service");
var userService = require(__dir + "/services/user-service");
var jsrsasign = require('jsrsasign');
module.exports = new MqConsumer();

function MqConsumer() {
    var servers = [config.get('connections.primaryServer'), config.get('connections.backupServer')];
    var manager = new stompit.ConnectFailover(servers, config.get('reconnectOptions'));

    this.connect = function () {
        manager.connect(function (error, client, reconnect) {
            console.info("===== Start Listen Queue ====");
            if (error) {
                console.log('connect error ' + error.message);
                return;
            }
            client.on('error', function (error) {
                console.error('STOMP_ERROR:' + error.message);
                reconnect();
            });
            var subscribeHeaders = {'destination': '/queue/logger', 'ack': 'client-individual'};
            client.subscribe(subscribeHeaders, function (error, message) {
                if (error) {
                    console.log('subscribe error ' + error.message);
                    return;
                }
                message.readString('utf-8', function (error, body) {
                    if (error) {
                        console.log('read message error ' + error.message);
                        return;
                    }
                    var isJson = IsJsonString(body);
                    if (isJson)
                        writeToLog(body);

                    client.ack(message);
                });

            });
        });
    }

    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function writeToLog(body) {
        var receive_mq_data = JSON.parse(body);
        var decode_token = jwt.decode(receive_mq_data.token);
        var audience = decode_token.aud;
        if (decode_token.audience != null) {
            audience = decode_token.audience;
        }
        var returnVal = {};
        var logData = {
            userId: audience,
            title: receive_mq_data.title == null ? 'Untitle' : receive_mq_data.title,
            source: receive_mq_data.source,
            level: receive_mq_data.level,
            meta: receive_mq_data.meta,
            data: receive_mq_data.data
        };        
        if (returnVal) {
            var findClient = {apiKey: audience};
            userService.find(findClient, function (error, data) {
                if (data.length > 0) {
                    logService.create(logData, function (err, data) {
                        if (err == null) {
                            console.log("WRITE LOG SUCCESS");
                        } else {
                            console.log("ERROR:" + error);
                        }
                    });
                } else {
                    console.log("NOT FOUND");
                }
            });
        }
    }

    function verifyTokenPureJS(token) {
        var retVal = {};
        var isValid = jsrsasign.jws.JWS.verifyJWT(token, 'megalogger', {
            alg: ['HS512']
        });
        if (isValid) {
            var a = token.split(".");
            var uHeader = jsrsasign.b64utos(a[0]);
            var uClaim = jsrsasign.b64utos(a[1]);

            var pHeader = jsrsasign.jws.JWS.readSafeJSONString(uHeader);
            var pClaim = jsrsasign.jws.JWS.readSafeJSONString(uClaim);
            retVal.aud = pClaim.aud;
        }

        return retVal;
    }

    function verifyToken(token) {
        var retVal = {};
        var isValid = jwt.verify(token, 'megalogger', {alg: ['HS512']});
        if (isValid) {
            retVal.aud = isValid.aud;
        }

        return retVal;
    }
}





