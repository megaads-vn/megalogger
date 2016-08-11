module.exports = BaseService;
function BaseService($config, $event, $logger) {

    this.buildPaginationQuery = function (filter) {
        var retVal = {};
        var skip = (filter.pageId) * filter.pageSize;
        var limit = filter.pageSize;
        retVal.skip = skip;
        retVal.limit = limit;
        return retVal;
    };

}

