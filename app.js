global.__dir = __dirname;
require(__dir + "/models/log");
require(__dir + "/models/source");
require(__dir + "/models/user");
require(__dir + "/models/log-temp");
require(__dir + "/connections/database-connection");
var quicksort = require(__dir + "/core/app/start");
quicksort.start();