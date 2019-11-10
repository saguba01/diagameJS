var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;

/*
 *Description: open io's introduction.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 January 2019
 *@required node.js,ExpressJS.
 */
router.get('/juice', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.io;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.juice,
    element: configString[lang].element.io.juice,
    recipe: configString[lang].recipe.io.juice,
    //required
    elementDefault: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/io/toast'
  };
  res.render('io/juice', data);
});

/*
 *Description: open io's sub lesson 1.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/toast', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.io;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.toast,
    element: configString[lang].element.io.toast,
    recipe: configString[lang].recipe.io.toast,
    //required
    elementDefault: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/io/bacon'
  };
  res.render('io/toast', data);
});

/*
 *Description: open io's sub lesson 1.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 2 April 2019
 *@required node.js,ExpressJS.
 */
router.get('/bacon', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.io;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.bacon,
    element: configString[lang].element.io.bacon,
    recipe: configString[lang].recipe.io.bacon,
    //required
    elementDefault: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/operator/easy'
  };
  res.render('io/bacon', data);
});

module.exports = router;
