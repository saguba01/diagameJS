var express = require('express');
var router = express.Router();
var configString = require('../app').configString;

var authen = function (req, res, next) {
  if (!req.cookies.lang) {
    req.cookies.lang = 'en';
  }
  var idToken = req.session.idToken;
  if (!idToken) {
    next();
  } else {
    res.redirect('/home');
  }
};

/* 
 * name: homePage
 * description: open login page
 * author: Bulakorn M.
 * create date: 25/01/2019
 * modify date: 25/01/2019
 */
router.get('/', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  var data = {
    layout: 'default',
    //required
    general: configString[lang].general,
    errorMsg: configString[lang].error,
    loginPage: true
  };
  res.clearCookie('idToken');
  res.render('login/index', data);
});

/* 
 * name: signOut
 * description: sign out from firebase
 * author: Bulakorn M.
 * create date: 28/01/2019
 * modify date: 28/01/2019
 */
router.get('/signOut', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        res.send(false);
      } else {
        res.clearCookie('idToken');
        res.send(true);
      }
    });
  }
});

module.exports = router;