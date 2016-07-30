var jwt = require('jsonwebtoken');
module.exports = AuthController;

function AuthController($config, $event, $logger) {
	var self = this;

	this.getToken = function(io){
		var inputs = io.inputs;
		io.json(inputs);
		// var apiKey = inputs.api_key;
		// // set expried time for token is 60 second
		// var token = jwt.sign({ api_key: apiKey }, 'shhhhh', { expiresIn: 60 });
		// var responseData = {};
		// responseData.token = token;
		// //response
		// io.json(responseData);
	}

	this.verifyToken = function(io){
		var inputs = io.inputs;
		var token = inputs.token;
		// verify token
		try {
  			var decoded = jwt.verify(token, 'shhhhh');
  			io.json(decoded);
		} catch(err) {
			io.json(err);
		}
	}

}