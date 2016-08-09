global.__dir = __dirname;
require(__dir + "/models/log");
require(__dir + "/models/source");
require(__dir + "/models/user");
require(__dir + "/connections/database-connection");
//require(__dir + "/network/mq-consumer");
var quicksort = require(__dir + "/core/app/start");
quicksort.start();