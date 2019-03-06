var localStratergy = require('passport-local').Strategy;
let User = require('./db/User');
module.exports = function(passport) {
  passport.serializeUser(function (user, done) { //add to session
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {//remove from session
    done(null, user);
  });
  passport.use(new localStratergy(function(username, password, done) {
    User.findOne({username}, function(err, doc){
      if(err) {
        done(err);
      } else {
        if(doc) {
          var valid = doc.comparePassword(password, doc.password);
          if(valid) {
            done(null, {
              username: doc.username,
              password: doc.password
            });
          } else {
            done(null, false);
          }
        } else {
          done(null, false);
        }
      }
    })
  }));
}