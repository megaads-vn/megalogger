var BaseService = require(__dir + "/services/base-service");
module.exports = new LogService();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Log = mongoose.model('Log');
var Source = mongoose.model('Source');
var LogTemp = mongoose.model('LogTemp');
function LogService($config, $event, $logger) {
    this.baseService = this.__proto__ = new BaseService($config, $event, $logger);
    this.create = function (logData, callbackFn) {
//        var bug = new Log({userId:1234,title: 'Bug undefined', source: 'Chiaki', level: "error", meta: {ip: "192.168.1.111", device: "iphone", language: "PHP"}, data: {line: 20, fileName: "index.php"}});
        processSource(logData.source, function () {
            var bug = new Log(logData);
            bug.save(callbackFn);
        });

    };
    this.update = function (query, logData, callbackFn) {
        Log.collection.update(query, {$set: logData}, {multi: true}, callbackFn);
    };
    this.delete = function (conditions, callbackFn) {
        Log.collection.remove(conditions, callbackFn);
    };
    /*
     * {    keyword:'dep trai',
     *      field:{key:'meta.language',value:'PHPX'},
     *      timeTo:"day/month/year",
     *      timeFrom:"day/month/year",
     *      level:'error',
     *      pageSize:20,
     *      pageId:1,
     *      notGroup: 1 (default=0)
     *      
     * }
     */
    this.find = function (filter, callbackFn) {
        var filterData = buildFilter(filter);
        var pagination = this.baseService.buildPaginationQuery(filterData);
        delete filterData.pageSize;
        delete filterData.pageId;
        var query = [
            {$match: filterData}
        ];
        if (typeof filter.notGroup == "undefined" || filter.notGroup == null) {
            query.push({
                "$group": {
                    _id: {level: "$level", title: "$title"},
                    total: {"$sum": 1},
                    time : {"$max" : "time"}
                }
            });
        }
        query.push( {$sort: {time: -1}});
        if (typeof filter.metric == 'undefined' || filter.metric != 'count') {
            query.push({$skip: pagination.skip});
            query.push({$limit: pagination.limit});
        }
        Log.aggregate(query, callbackFn);
    };

    this.count = function(filter, callbackFn){
        var filterData = buildFilter(filter);
        delete filterData.pageSize;
        delete filterData.pageId;
        var query = [
            {$match: filterData}
        ];
        if (typeof filter.notGroup == "undefined" || filter.notGroup == null) {
            query.push({
                $group: {
                    _id: {level: "$level", title: "$title"}
                }
            });
        }
        query.push({
            $group: {
                _id: null,
                count: { $sum: 1 }
            }
        });
        return Log.aggregate(query, callbackFn);
    };
    

    this.findCount = function(filter,callbackFn){
        var filterData = buildFilter(filter);
        delete filterData.pageSize;
        delete filterData.pageId;
        Log.collection.count(filterData,callbackFn);
    };

    function buildFilter(filter) {
        var retVal = {
            pageSize: 20,
            pageId: 0
        };
        var timeRange = {};
        if (typeof filter.keyword != "undefined" && filter.keyword != null) {
            retVal.title = new RegExp(filter.keyword, "i");
        }
        if (typeof filter.title != "undefined" && filter.title != null) {
            retVal.title = filter.title;
        }
        if (typeof filter.userId != "undefined" && filter.userId != null) {
            retVal.title = filter.userId;
        }
        if (typeof filter.timeTo != "undefined" && filter.timeTo != null) {
            var dates = filter.timeTo.split("/");
            timeRange['$lt'] = new Date(dates[2], dates[1] - 1, dates[0], 23, 59, 59);
            retVal.time = timeRange;
        }
        if (typeof filter.timeFrom != "undefined" && filter.timeFrom != null) {
            var dates = filter.timeFrom.split("/");
            timeRange['$gte'] = new Date(dates[2], dates[1] - 1, dates[0]);
            retVal.time = timeRange;

        }
        if (typeof filter.level != "undefined" && filter.level != null) {
            retVal.level = filter.level;
        }
        if (typeof filter.source != "undefined" && filter.source != null) {
            retVal.source = filter.source;
        }
        if (typeof filter.field != "undefined" && filter.field != null) {
            var key = filter.field.key;
            retVal[key] = filter.field.value;
        }
        if (typeof filter.pageSize != "undefined" && filter.pageSize != null) {
            retVal.pageSize = filter.pageSize;
        }
        if (typeof filter.pageId != "undefined" && filter.pageId != null) {
            retVal.pageId = filter.pageId;
        }
        return retVal;
    }
    ;
    String.prototype.hashCode = function () {
        var hash = 0, i, chr, len;
        if (this.length === 0)
            return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    function processSource(name, callbackFn) {
        var code = name.hashCode();
        Source.collection.findOne({code: code}, function (err, source) {
            if (source == null) {
                var newSource = new Source({code: code, name: name});
                newSource.save();
            }
            callbackFn();
        });
    }
}

