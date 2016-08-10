var BaseService = require(__dir + "/services/base-service");
module.exports = new UserService();
var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var User = mongoose.model('User');
var Schema = mongoose.Schema;
var crypto = require('crypto'),
        algorithm = 'aes-256-ctr',
        password = 'mega-logger-3172NT';
function UserService($config, $event, $logger) {
    var self = this;
    this.baseService = this.__proto__ = new BaseService($config, $event, $logger);
    this.create = function (data, callbackFn) {
        buildSaveData(data);
        var user = new User(data);
        user.save(callbackFn);

    };
    this.update = function (query, data, callbackFn) {
        buildSaveData(data);
        User.collection.update(query, {$set: data}, {multi: true}, callbackFn);
    };
    this.delete = function (conditions, callbackFn) {
        User.collection.remove(conditions, callbackFn);
    };
    /*
     * {    fullName:'lapdx',
     *      timeTo:new Date(2016,8,1),
     *      timeFrom:new Date(2016,6,1),
     *      userName:'admin',
     *      password:'abcxyz',
     *      pageSize:20,
     *      pageId:1
     *      
     * }
     */
    this.find = function (filter, callbackFn) {
        var filterData = buildFilter(filter);
        delete filterData.pageSize;
        delete filterData.pageId;
        var pagination = this.baseService.buildPaginationQuery(filter);
        User.collection.find(filterData,null,pagination).toArray(callbackFn);
        
    };

    function buildFilter(filter) {
        var retVal = {
            pageSize: 20,
            pageId: 0
        };
        var timeRange = {};
        if (typeof filter.fullName != "undefined" && filter.fullName != null) {
            retVal.fullName = new RegExp(filter.fullName, "i");
        }
        if (typeof filter.timeTo != "undefined" && filter.timeTo != null) {
            timeRange.$lt = filter.timeTo;
            retVal.createTime = timeRange;
        }
        if (typeof filter.timeFrom != "undefined" && filter.timeFrom != null) {
            timeRange.$gte = filter.timeFrom;
            retVal.createTime = timeRange;

        }
        if (typeof filter.userName != "undefined" && filter.userName != null) {
            retVal.userName = filter.userName;
        }
        if (typeof filter.password != "undefined" && filter.password != null) {
            retVal.password = filter.password;
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
    function buildSaveData(data){
        data.password = bcrypt.hashSync(data.password);
        data.apiKey = self.baseService.encrypt(data.fullName + data.password + data.userName);
    }
}

