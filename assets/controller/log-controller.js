megalog.controller("LogController", LogController);
function LogController($scope, $http, $rootScope) {
    //--------------------------------------------------------------------------
    $scope.sources = sources;
    $scope.filter = {
        pageSize: 3,
        pageId: 0
    };
    $scope.levels = [
        {name: "Critical", value: "critical", class: "critical"},
        {name: "Error", value: "error", class: "error"},
        {name: "Warning", value: "warning", class: "warning"},
        {name: "Debug", value: "debug", class: "debug"},
        {name: "Info", value: "info", class: "info"}
    ];
    $scope.cssClass = [
        {key: "critical", value: "badge-important"},
        {key: "error", value: "badge-important"},
        {key: "warning", value: "badge-warning"},
        {key: "debug", value: "badge-inverse"},
        {key: "info", value: "badge-info"}
    ];
    $scope.isFinding = false;
    $scope.logs = [];
    $scope.filter.source = $scope.sources[0];


    //--------------------------------------------------------------------------
    //  Initialize
    $scope.baseController = this.__proto__ = new BaseController($scope, $http, $rootScope);
    this.initialize = function ( ) {
        $(".datepicker").datepicker({
            dateFormat: "dd/mm/yy"
        });
    };
    $scope.find = function (isReset) {
        if (isReset) {
            $scope.filter.pageId =0;
        };
        var filterData = buildFilter();
        $scope.isFinding = true;
        $http.post("/log/find", filterData).success(function (data) {
            $scope.hideLoading();
            $scope.isFinding = false;
            if (data.status == "successful") {
                console.log(data);
                $scope.logs = data.logs;
                $scope.filter.pageId = data.pageId;
                $scope.pagesCount = data.pagesCount;
            }
        }).error(function () {
            $scope.hideLoading();
            alert("Không thể tải danh sách, vui lòng thử lại hoặc liên hệ bộ phận kỹ thuật để được hỗ trợ.");
            $scope.isSaving = false;
        });
    };
    $scope.find();
    $scope.reset = function () {
        $scope.filter = {
            pageSize: 20,
            pageId: 0
        };
        $scope.filter.source = $scope.sources[0];
        $scope.find();
    }
    function buildFilter() {
        var retVal = {
            pageId: $scope.filter.pageId,
            pageSize: $scope.filter.pageSize
        };
        if ($scope.filter.keyword != null) {
            retVal.keyword = $scope.filter.keyword;
        }
        if ($scope.filter.source != null) {
            retVal.source = $scope.filter.source.name;
        }
        if ($scope.filter.level != null) {
            retVal.level = $scope.filter.level;
        }
        if ($scope.filter.timeFrom != null) {
            retVal.timeFrom = $scope.filter.timeFrom;
        }
        if ($scope.filter.timeTo != null) {
            retVal.timeTo = $scope.filter.timeTo;
        }
        if ($scope.filter.field != null) {
            retVal.field = $scope.baseController.stringToField($scope.filter.field);
        }

//        retVal.field = $scope.filter.keyword;
        return retVal;
    }
    this.initialize( );
}