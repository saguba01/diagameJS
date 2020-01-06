var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;

/*
 *Description: open diagram question.
 *@version 2.0
 *@author Thongthorn Karapakdee
 *@since 6 December 2019
 *@required node.js,ExpressJS.
 */
router.get('/', authen, function (req, res, next) {
    let lang = req.cookies.lang;
    let lesson = configString[lang].lesson.variable;
    var data = {
        layout: 'default',
        navBar: true,
        user: req.session.user,
        lesson: lesson,
        subLesson: lesson.subLesson.juice,
        element: configString[lang].element.variable.juice,
        intro: configString[lang].intro,
        recipe: configString[lang].recipe.variable.juice,
        //required
        elementDefault: configString[lang].element.general,
        general: configString[lang].general,
        achievementList: configString[lang].achievement,
        errorMsg: configString[lang].error,
        nextPage: '/lesson/variable/cereal'
    };
    res.render('MDQ/diagram-question', data);
 
  });

  module.exports = router;