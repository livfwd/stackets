// require('../../env.js')
var db = require('../config/db.js');
var jwt = require('jsonwebtoken');

module.exports = {
  getUserData: function(req, res) {
    //console.log('decoded', req.headers)
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function(err, decoded) {
      if (decoded) {
        var params = {
          userId: req.params.userId
        };
        db.User.findOne({
          where: {
            "id": params.userId
          }
        })
        .then(function(response) {
          res.status(200).send(response);
        })
        .catch(function(error) {
          console.log('Error updating favorite: ', error)
          res.status(400).send(error);
        });
      }
    });
  }
};
