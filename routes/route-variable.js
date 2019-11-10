var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;

/*
 *Description: open variable's introduction.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 January 2019
 *@required node.js,ExpressJS.
 */
router.get('/juice', authen, function (req, res, next) {
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
  res.render('variable/juice', data);
});

/*
 *Description: open variable's sub lesson 2.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 2 April 2019
 *@required node.js,ExpressJS.
 */
router.get('/cereal', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.variable;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.cereal,
    element: configString[lang].element.variable.cereal,
    recipe: configString[lang].recipe.variable.cereal,
    //required
    elementDefault: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/variable/salad'
  };
  res.render('variable/cereal', data);
});

/*
 *Description: open variable's sub lesson 1.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/salad', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.variable;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.salad,
    element: configString[lang].element.variable.salad,
    recipe: configString[lang].recipe.variable.salad,
    //required
    elementDefault: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/io/juice'
  };
  res.render('variable/salad', data);
});

module.exports = router;