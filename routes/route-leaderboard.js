var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var setting = require('../public/javascripts/setting');


router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  var uid = req.session.user.uid;
  const general = await setting.getSetting(lang); 
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    //required
    lesson: configString[lang].general.leaderboard,
    setting:configString[lang].general.setting,
    button:configString[lang].general.button,
    general: configString[lang].general,
    errorMsg: configString[lang].error,
    uid:uid,
  };
  res.render('leaderboard/index', data);
});


  module.exports = router;