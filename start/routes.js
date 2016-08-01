
module.exports = function ($route, $logger) {
    /** Register HTTP requests **/
    $route.get("/log",function(io){
		var inputs = io.inputs;
		io.echo("hello");
    });

    $route.post("/logger/v1/get-token", "AuthController@getToken");

    $route.post("/logger/v1/verify-token", "AuthController@verifyToken");

    $route.post("/logger/v1/init-log", "AuthController@initLog");
    /** Register socket.io requests **/
    /** Register filters **/
};