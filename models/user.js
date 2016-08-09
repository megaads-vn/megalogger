
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

/**
 * Log Schema
 */

var UserSchema = new Schema({
  fullName: { type : String, default : '', trim : true },
  userName: { type : String, default : '', trim : true },
  password: { type : String, default : '', trim : true },
  apiKey: { type : String, default : '', trim : true },
  createTime  : { type : Date, default : Date.now },
  activeTime  : { type : Date, default : Date.now }
});

/**
 * Validations
 */

UserSchema.path('fullName').required(true, 'Full name cannot be blank');
UserSchema.path('userName').required(true, 'User name cannot be blank');
UserSchema.path('password').required(true, 'Password cannot be blank');
mongoose.model('User', UserSchema);
