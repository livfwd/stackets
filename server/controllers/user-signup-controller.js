// require('../../env.js')
var db = require('../config/db.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
	signup: function(req, res) {
	console.log('signup request...', req.body);
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
	    db.User.create({
	    	email: req.body.email,
	      password: hash,
	      provider: 'self'
	    }).then(function(user, err) {
				var token = jwt.sign({
					user: user.dataValues.email,
					provider: user.provider
				}, process.env.JWT_SECRET);
	      	console.log('successfully created ', user.dataValues.email)
				res.status(200);
				res.send(token);
	    })
	});
  }
}
