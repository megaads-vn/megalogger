module.exports = BaseService;
var crypto = require('crypto'),
        algorithm = 'aes-256-ctr',
        password = 'mega-logger-3172NT';
function BaseService($config, $event, $logger) {

    this.buildPaginationQuery = function (filter) {
        var retVal = {};
        var skip = (filter.pageId) * filter.pageSize;
        var limit = filter.pageSize;
        retVal.skip = skip;
        retVal.limit = limit;
        return retVal;
    };

    this.encrypt = function (text) {
        var cipher = crypto.createCipher(algorithm, password);
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    };

    this.decrypt = function (text) {
        var decipher = crypto.createDecipher(algorithm, password);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    };
}

