
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

/**
 * Log Schema
 */

var SourceSchema = new Schema({
  code: { type : Number},
  name: { type : String, default : '', trim : true },
  createTime  : { type : Date, default : Date.now }
});

mongoose.model('Source', SourceSchema);
