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
        var input = io.inputs;
        $logService.find(input, function (err, logs) {
            var data = {};
            if (err) {
                data.status = 'fail';
                data.message = err;
                return io.json(data);
            } else {
                var pageSize = input.pageSize;
                var pageId = input.pageId;
                input.metric = 'count';
                $logService.find(input, function (err, countLog) {
                    var data = {};
                    data.status = 'successful';
                    data.logs = logs;
                    data.pagesCount = recordsCountToPagesCount(countLog.length,pageSize);
                    data.pageId = pageId;
                    return io.json(data);
                });
            }
        });
    };

    function recordsCountToPagesCount(recordsCount, pageSize) {
        var retVal = Math.ceil((recordsCount / pageSize));
        if (recordsCount % pageSize > 0) {
            retVal++;
        }
        return retVal;
    }

}