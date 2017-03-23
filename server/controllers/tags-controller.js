var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    db.Tag.findAll({})
      .then(function(data) {
        // console.log('inside findAll', data);
        res.status(200).json(data);
      });
  }
};