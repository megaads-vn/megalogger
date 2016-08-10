module.exports = HomeController;
var mongoose = require('mongoose').set('debug', true);
var Log = mongoose.model('Log');
function HomeController($config, $event, $logger, $logService, $userService) {
    var self = this;
    this.index = function (io) {
        /*
         // fire a event
         $event.fire("home.index", {controller: "home", action: "index"});
         // get session data
         var user = io.session.get("user", null);
         // user logged in
         if (user != null) {
         var defaultValue = "first visit";
         // get session data
         var responseData = io.session.get("message", defaultValue);
         // set session data
         if (responseData === defaultValue) {
         io.session.set("message", "welcome back");
         }
         // respond
         io.status(200)
         .header("Content-Length", responseData.length)
         .echo(responseData);
         }
         // delegate to login action
         else {
         io.delegate("User/AuthController@login");
         }
         */
//        io.echo($logService.get(1).name);
        $userService.create({fullName:'lapdx',userName:'admin',password:'123456'},function(err,data){
            console.log(data);
            console.log(err);
        });
//        $userService.update({fullName: 'lapdx'}, {fullName: 'Dam Xuan Lap'}, function (err, data) {
//            console.log(err);
//            console.log(data.result);
//        });
//         Log.collection.update({}, {$set: {title: 'Error'}},{multi: true},function(err,data){
//              console.log(err);
//              console.log(data);
//         });
//         Log.remove({title: 'Bug undefined'},function(err){
//             console.log(err);
//             io.echo(err);
//         });
//        $logService.delete({title: "Error"}, function (err, data) {
//            console.log(err);
//            console.log(data);
//        });
//        $userService.find({pageSize:1,pageId:0}, function (err, data) {
//            console.log(err);
//            console.log(data);
//        });
//        $logService.find({pageSize:1,pageId:0},function (err, data) {
//            console.log(err);
//            console.log(data);
//        });
//        var datas = [];
//        for (var i = 0, max = 500000; i < max; i++) {
//            datas.push({userId: i, title: 'Bug undefined' + i, source: 'Chiaki', level: "error", meta: {ip: "192.168.1.111", device: "iphone", language: "PHP"}, data: {line: 20, fileName: "index.php"}});
////            $logService.create({userId:i,title: 'Bug undefined'+i, source: 'Chiaki', level: "error", meta: {ip: "192.168.1.111", device: "iphone", language: "PHP"}, data: {line: 20, fileName: "index.php"}}, function (err, data) {
//                console.log(i);
////            });
//        }
//        Log.create(datas, function (err, logs) {
//            console.log(logs);
//            console.log(err);
//        });
        io.echo("ok");
    };
    this.broadcast = function (io) {
        var responseData = {
            status: "successful",
            result: io.inputs
        };
        // respond to other sessions
        io.toEvent("message").toAll().toExpection(io.session).json(responseData);
    };
    this.download = function (io) {
        // respond
        io.status(200)
                .header("Content-Type", "image/png")
                .download(__dir + "/assets/images/logo.png");
    };
}