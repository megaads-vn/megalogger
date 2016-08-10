
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

/**
 * Log Schema
 */

var LogTempSchema = new Schema({
    _id: {type: Schema.Types.Mixed, default: {}},
    total: {type: Number}
});

mongoose.model('LogTemp', LogTempSchema);
