
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

/**
 * Log Schema
 */

var LogSchema = new Schema({
  title: { type : String, default : '', trim : true },
  userId: { type : String, default : '', trim : true },
  source: { type : String, default : '', trim : true },
  level: { type : String, default : '', trim : true },
  title_number: { type : Number, default : 0, trim : true, index: true },
  source_number: { type : Number, default : 0, trim : true },
  level_number: { type : Number, default : 0, trim : true },
  data: { type : Schema.Types.Mixed, default : {}},
  meta: { type : Schema.Types.Mixed, default : {}},
  time  : { type : Date, default : Date.now }
});

/**
 * Validations
 */

LogSchema.path('title').required(true, 'Log title cannot be blank');
LogSchema.path('data').required(true, 'Log data cannot be blank');
LogSchema.path('source').required(true, 'Log source cannot be blank');
LogSchema.path('level').required(true, 'Log level cannot be blank');
LogSchema.path('meta').required(true, 'Log meta cannot be blank');
LogSchema.path('userId').required(true, 'Log userId cannot be blank');
mongoose.model('Log', LogSchema);
