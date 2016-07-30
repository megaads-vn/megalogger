
module.exports = function ($route, $logger) {
    /** Register HTTP requests **/
    $route.get("/log",function(io){
		var inputs = io.inputs;
		io.echo("hello");
    });

    $route.post("/logger/v1/get-token", "AuthController@getToken");

    $route.any("/logger/v1/verify-token", "AuthController@verifyToken");
    /** Register socket.io requests **/
    /** Register filters **/
};