module.exports = LogController;
//var mongoose = require('mongoose').set('debug', true);
//var Log = mongoose.model('Log');
function LogController($config, $event, $logger, $logService, $userService, $sourceService) {
    var self = this;
    this.index = function (io) {
        $sourceService.find({}, function (err, sources) {
            io.render("log/index", {sources: sources});
        });
    };
    this.find = function (io) {
        var data = {};
        var input = io.inputs;
        $logService.find(input, function (err, logs) {
            if (err) {
                io.json(self._getFailStatus(err.message));
            } else {
                data = {
                    logs: logs,
                    pageId: input.pageId
                };
                $logService.count(input, function (err, countArr) {
                    if(err){
                        io.json(self._getFailStatus(err.message));
                    }else{
                        data.pagesCount = recordsCountToPagesCount(countArr[0].count,input.pageSize);
                        io.json(self._getSuccessStatus(data));
                    }
                });
            }
        });
    };

    this.getPagesCount = function(){
        var pageSize = input.pageSize;
        var input = io.inputs;
    };

    this._getSuccessStatus = function (data) {
        return {
            status: 'successful',
            result: data
        }
    };
    this._getFailStatus = function (message) {
        return {
            status: 'fail',
            message: message
        };
    };


    function recordsCountToPagesCount(recordsCount, pageSize) {
        var retVal = Math.ceil((recordsCount / pageSize));
        return retVal;
    }

}