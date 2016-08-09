var BaseService = require(__dir + "/services/base-service");
module.exports = new SourceService();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Source = mongoose.model('Source');
function SourceService($config, $event, $logger) {
    this.baseService = this.__proto__ = new BaseService($config, $event, $logger);
    this.create = function (data, callbackFn) {
            var bug = new Source(data);
            bug.save(callbackFn);
        };
    this.update = function (query, data, callbackFn) {
        Source.collection.update(query, {$set: data}, {multi: true}, callbackFn);
    };
    this.delete = function (conditions, callbackFn) {
        Source.collection.remove(conditions, callbackFn);
    };
    /*
     * {    keyword:'dep trai',
     *      field:{key:'meta.language',value:'PHPX'},
     *      timeTo:new Date(2016,8,1),
     *      timeFrom:new Date(2016,6,1),
     *      level:'error',
     *      pageSize:20,
     *      pageId:1,
     *      notGroup: 1 (default=1)
     *      
     * }
     */
    this.find = function (filter, callbackFn) {
        var filterData = buildFilter(filter);
        delete filterData.pageSize;
        delete filterData.pageId;
        var pagination = this.baseService.buildPaginationQuery(filter);
        Source.collection.find(filterData,null,pagination).toArray(callbackFn);
        
    };

    function buildFilter(filter) {
        var retVal = {
            pageSize: 20,
            pageId: 0
        };
        var timeRange = {};
        if (typeof filter.name != "undefined" && filter.name != null) {
            retVal.name = new RegExp(filter.keyword, "i");
        }
        if (typeof filter.timeTo != "undefined" && filter.timeTo != null) {
            timeRange.$lt = filter.timeTo;
            retVal.createTime = timeRange;
        }
        if (typeof filter.timeFrom != "undefined" && filter.timeFrom != null) {
            timeRange.$gte = filter.timeFrom;
            retVal.createTime = timeRange;

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
}

