var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;

/*
 *Description: 
 *@version 1.0
 *@author Thanawin
 *@since 06 December 2019
 *@required node.js,ExpressJS.
 */

router.get('/', authen, function (req, res, next) {
    let lang = req.cookies.lang;
    let lesson = configString[lang].lesson.logic;
    var data = {
      layout: 'default',
      user: req.session.user,
      //navbar
      navBar: true,
      elementDefault: configString[lang].element.general,
      general: configString[lang].general,
      lesson: lesson,
      subLesson: lesson.subLesson.addlogic
      //
    };
    res.render('addlogic/addlogic', data);
  });

  module.exports = router;