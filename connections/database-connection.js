var config = require(__dir + "/core/app/config");
var mongoose = require('mongoose');
connect().on('error', console.log)
        .on('disconnected', connect);
mongoose.connection.once('open', function () {
    console.info('Connected to database');
})
function connect() {
    return mongoose.connect(config.get("connections.mongoConnectionString")).connection;
}

