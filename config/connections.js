module.exports = {
    mongoConnectionString:'mongodb://127.0.0.1:27017/megalogger',
    primaryServer: {
        'host': '127.0.0.1',
        'port': 61613,
        'connectHeaders':{
            'host': '',
            'login': '',
            'passcode': '',
            'heart-beat': '5000,5000'
        }
    },
    backupServer: {
        'host': '127.0.0.1',
        'port': 61613,
        'connectHeaders':{            
            'host': '',
            'login': '',
            'passcode': '',
            'heart-beat': '5000,5000'
        }
    },
    reconnectOptions: {'maxReconnects': 10}
};