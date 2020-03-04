var admin = require('../configs/firebase-config').admin;

var authen = function (req, res, next) {
  if (!req.cookies.lang) {
    req.cookies.lang = 'en';
  }
  var lang = req.cookies.lang;
  if (!req.session.idToken) {
    req.session.idToken = req.cookies.idToken;
  }

  var idToken = req.session.idToken;
  if (idToken) {
    admin.auth().verifyIdToken(idToken)
      .then(function (decodedToken) {
        admin.auth().getUser(decodedToken.uid)
          .then(function (user) {
            req.session.user = {
              uid: user.uid,
              displayName: user.displayName ? user.displayName : 'Player#' + user.uid.substr(0, 6),
              photoURL: user.photoURL
            };
            next();
          })
          .catch(function (error) {
            req.session.destroy(function (err) {});
            res.redirect('/');
          });
      }).catch(function (error) {
        req.session.destroy(function (err) {});
        res.redirect('/');
      });
  }else{
    req.cookies.lang = lang;
    res.redirect('/');
  }
};

module.exports = authen;