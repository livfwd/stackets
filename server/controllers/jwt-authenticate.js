// require('../../env.js')
var jwt = require('jsonwebtoken');

module.exports = {
	authenticate: function(req, res) {
		console.log('authenticate request...', req.headers)
		jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function(err, decoded) {
		  	if (err) {
          res.status(401);
          res.send(null);
        }
		  	if (decoded) {
		  		console.log('decoded user..', decoded);
		  		res.status(200);
		  		res.send(decoded);
		  	}
		});
	}
}
