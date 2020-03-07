var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var setting = require('../public/javascripts/setting');


router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const general = await setting.getSetting(lang); 
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    //required
    lesson: {
      text: "Leaderboard"
    },
    setting:general.setting,
    button:general.button,
    general: configString[lang].general,
    errorMsg: configString[lang].error,
  };
  res.render('leaderboard/index', data);
});


  module.exports = router;