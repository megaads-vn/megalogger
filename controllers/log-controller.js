module.exports = LogController;
//var mongoose = require('mongoose').set('debug', true);
//var Log = mongoose.model('Log');
function LogController($config, $event, $logger, $logService, $userService, $sourceService) {
    var self = this;
    this.index = function (io) {
        $sourceService.find({}, function (err, sources) {
            //console.log(sources);
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
                        data.pagesCount = 0;
                        if(countArr.length > 0){
                            data.pagesCount = recordsCountToPagesCount(countArr[0].count,input.pageSize);
                        }
                        io.json(self._getSuccessStatus(data));
                    }
                });
            }
        });
    };

    this.rebuild = function (io) {
        $sourceService.find({}, function (err, sources) {
            for(var i = 0; i < sources.length; i++){
                var sourceObj = sources[i];
                $logService.update({source: sourceObj.name}, {source_number : $logService.crc32(sourceObj.name)});
            }
            //io.json(self._getSuccessStatus({}));
        });
        var levels = [
            {name: "Critical", value: "critical", class: "critical"},
            {name: "Error", value: "error", class: "error"},
            {name: "Warning", value: "warning", class: "warning"},
            {name: "Debug", value: "debug", class: "debug"},
            {name: "Info", value: "info", class: "info"}
        ];
        for(var i = 0; i < levels.length; i++){
            var levelObj = levels[i];
            $logService.update({level: levelObj.name}, {level_number : $logService.crc32(levelObj.name)});
        }
        // $logService.update({}, {level_number : 1, title_number: 1});
        // io.json(self._getSuccessStatus({}));
        $logService.updateAllTitle({}, function () {
            io.json(self._getSuccessStatus({}));
        })
        
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