module.exports = function ($route, $logger) {
    /** Register HTTP requests **/
    $route.get("/log/", "LogController@index");
    $route.any("/log/find", "LogController@find");
    /** Register socket.io requests **/
    /** Register filters **/
};