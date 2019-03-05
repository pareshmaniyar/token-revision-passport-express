var express = require('express');
var router = express.Router();
var User = require('../db/User');

module.exports = function (passport) {
  router.post('/signup', function(req, res) {
    var body = req.body,
      username = body.username,
      password = body.password;
    //check if user already exists
    User.findOne({username}, function(err, res){
      if(err) {res.status(500).send('internal server error')}
      if(doc) {
        res.status(401).send('Username already exists');
      } else {
        var record = new User();
        record.username = username;
        record.password = record.hashPassword(password);
        record.save(function(err, user) {
          if(err) {
            res.status(500).send('db error');
          } else {
            res.send(user);
          }
        });
      }
    });
  });
  return router;
}
