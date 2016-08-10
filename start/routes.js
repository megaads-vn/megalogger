module.exports = function ($route, $logger) {
    /** Register HTTP requests **/
    $route.get("/home", "HomeController@index");
    $route.get("/", "LogController@index");
    $route.get("/log", "LogController@index");
    $route.any("/log/find", "LogController@find");
    /** Register socket.io requests **/
    /** Register filters **/
};