module.exports = function ($route, $logger) {
    /** Register HTTP requests **/
    $route.get("/home", "HomeController@index");
    $route.get("/", "LogController@index");
    $route.get("/rebuild", "LogController@rebuild");
    $route.get("/log", "LogController@index");
    $route.any("/log/find", "LogController@find");
    /** Register socket.io requests **/
    /** Register filters **/

    $route.filter("auth", function (io) {
        var authToken = $config.get('app.token');
        if (io.inputs.token == authToken || io.session.token == authToken) {
            io.session.token = authToken;
            return true;
        }
        io.json({status: '401', 'message': 'Authen'});
        return false;
    });
};