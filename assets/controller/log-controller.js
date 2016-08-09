megalog.controller("LogController", LogController);
function LogController($scope, $http, $rootScope) {
    //--------------------------------------------------------------------------
    $scope.sources = sources;
    $scope.filter = {
        pageSize: 20,
        pageId: 0
    };
    $scope.dialog = {
        filter: {
            pageSize: 4,
            pageId: 0
        },
        logs: []
    }
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
    $scope.log = {};
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
            $scope.filter.pageId = 0;
        }
        var filterData = buildFilter();
        $scope.isFinding = true;
        $http.post("/log/find", filterData).success(function (data) {
            $scope.hideLoading();
            $scope.isFinding = false;
            if (data.status == "successful") {
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
    $scope.openDialog = function (log) {
        $scope.log = angular.copy(log);
        $scope.getLogDetail(true);
    };

    $scope.getLogDetail = function (isReset) {
        if (isReset) {
            $scope.dialog.filter.pageId = 0;
        }
        $scope.dialog.filter.title = $scope.log._id.title;
        var filterData = buildFilterDialog();
        $http.post("/log/find", filterData).success(function (data) {
            $scope.hideLoading();
            $scope.isFinding = false;
            if (data.status == "successful") {
                $scope.dialog.logs = data.logs;
                $scope.dialog.filter.pageId = data.pageId;
                $scope.dialog.pagesCount = data.pagesCount;
                $scope.baseController.openDialogModal("#logDetail");
            }
        }).error(function () {
            $scope.hideLoading();
            alert("Không thể tải danh sách, vui lòng thử lại hoặc liên hệ bộ phận kỹ thuật để được hỗ trợ.");
            $scope.isSaving = false;
        });
    }
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
        if ($scope.filter.userId != null) {
            retVal.userId = $scope.filter.userId;
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
    function buildFilterDialog() {
        var retVal = {
            pageId: $scope.dialog.filter.pageId,
            pageSize: $scope.dialog.filter.pageSize,
            notGroup: 1,
            title: $scope.dialog.filter.title
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
        if ($scope.filter.userId != null) {
            retVal.userId = $scope.filter.userId;
        }

        return retVal;
    }
    this.initialize( );
}