module.exports = {
    mongoConnectionString:'mongodb://192.168.1.172:27017/megalogger',
    primaryServer: {
        'host': '192.168.1.172',
        'port': 61613,
        'connectHeaders':{
            'host': '',
            'login': '',
            'passcode': '',
            'heart-beat': '5000,5000'
        }
    },
    backupServer: {
        'host': '192.168.1.172',
        'port': 61613,
        'connectHeaders':{
            'heart-beat': '5000,5000',
            'host': '',
            'login': '',
            'passcode': ''
        }
    },
    reconnectOptions: {'maxReconnects': 10}
};