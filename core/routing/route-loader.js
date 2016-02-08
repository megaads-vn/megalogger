/**
 * @author Phuluong
 * December 27, 2015
 */

/** Exports **/
module.exports = new RouteLoader();
/** Imports **/
var IO = require("../io/io");
/** Modules **/
function RouteLoader() {
    this.filterContainer = [];
    this.load = function (controllerLoader, httpConnection, socketIOConnection, sessionManager) {
        this.sessionManager = sessionManager;
        this.socketIOConnection = socketIOConnection;
        this.httpConnection = httpConnection;
        this.controllerLoader = controllerLoader;
    };
    this.any = function (routeName, route, filters) {
        this.io(routeName, route, filters);
        this.get(routeName, route, filters);
        this.post(routeName, route, filters);
        return this;
    };
    this.io = function (routeName, action, filters) {
        var self = this;
        this.socketIOConnection.addMessageListener(routeName, function (data, session) {
            var io = new IO(self.controllerLoader, routeName, self.sessionManager);
            io.bindSocketIO(data, session);
            executeAction(self, action, io, filters);
        });
        return this;
    };
    this.get = function (routeName, action, filters) {
        var self = this;
        this.httpConnection.get(routeName, function (req, res) {
            var io = new IO(self.controllerLoader, routeName, self.sessionManager);
            io.bindHttp(req, res);
            executeAction(self, action, io, filters);
        });
        return this;
    };
    this.post = function (routeName, action, filters) {
        var self = this;
        this.httpConnection.post(routeName, function (req, res) {
            var io = new IO(self.controllerLoader, routeName, self.sessionManager);
            io.bindHttp(req, res);
            executeAction(self, action, io, filters);
        });
        return this;
    };
    /**
     * Register a filter to the route
     * @param {String} name
     * @param {callable} callbackFn
     * @returns {RouteLoader}
     */
    this.filter = function (name, callbackFn) {
        this.filterContainer[name] = callbackFn;
        return this;
    };
    function executeAction(self, action, io, filters) {
        var interrupt = false;
        // call before-filter
        if (filters != null && filters.before != null) {
            if (typeof filters.before === "function") {
                if (filters.before(io) === false) {
                    interrupt = true;
                }
            } else if (typeof filters.before === "string") {
                if (self.filterContainer[filters.before] != null && self.filterContainer[filters.before](io) === false) {
                    interrupt = true;
                }
            } else if ((typeof filters.before === "object") && filters.before.length > 0) {
                for (var i = 0; i < filters.before.length; i++) {
                    if (typeof filters.before[i] === "function") {
                        if (filters.before[i](io) === false) {
                            interrupt = true;
                        }
                    } else if (typeof filters.before[i] === "string") {
                        if (self.filterContainer[filters.before[i]] != null && self.filterContainer[filters.before[i]](io) === false) {
                            interrupt = true;
                        }
                    }
                }
            }

        }
        // if before-filter return false, return before calling controller method
        if (interrupt) {
            return;
        }
        // call controller method
        if (typeof action === "function") {
            action(io);
        } else if (typeof action === "string") {
            self.controllerLoader.getAction(action)(io);
        }
        // call after-filter
        if (filters != null && filters.after != null) {
            if (typeof filters.after === "function") {
                filters.after(io);
            } else if (typeof filters.after === "string") {
                if (self.filterContainer[filters.after] != null) {
                    self.filterContainer[filters.after](io);
                }
            } else if ((typeof filters.after === "object") && filters.after.length > 0) {
                for (var i = 0; i < filters.after.length; i++) {
                    if (typeof filters.after[i] === "function") {
                        filters.after[i](io);
                    } else if (typeof filters.after[i] === "string") {
                        if (self.filterContainer[filters.after[i]] != null) {
                            self.filterContainer[filters.after[i]](io);
                        }
                    }
                }
            }
        }
    }
}