var config = require(__dir + "/core/app/config");
var routerLoader = require(__dir + "/core/loader/route-loader");
var event = require(__dir + "/core/app/event");
var logger = (require(__dir + "/core/log/logger-factory")).getLogger();
var logService = require(__dir + "/services/log-service");
var userService = require(__dir + "/services/user-service");
var sourceService = require(__dir + "/services/source-service");
module.exports = function ($serviceContainer) {
    $serviceContainer.bind("$config", config);
    $serviceContainer.bind("$route", routerLoader);
    $serviceContainer.bind("$event", event);
    $serviceContainer.bind("$logger", logger);
    $serviceContainer.bind("$userService", userService);
    $serviceContainer.bind("$sourceService", sourceService);
    $serviceContainer.bind("$logService", logService);
};