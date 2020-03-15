var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;

/*
 *Description: open decision's introduction.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 January 2019
 *@required node.js,ExpressJS.
 */
router.get('/coffee', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.decision;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.coffee,
    element: configString[lang].element.decision.coffee,
    recipe: configString[lang].recipe.decision.coffee,
    //required
    elementDefault: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/decision/steak',
    button:general.button
  };
  res.render('decision/coffee', data);
});

/*
 *Description: open decision's sub lesson 1.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/steak', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.decision;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.steak,
    element: configString[lang].element.decision.steak,
    recipe: configString[lang].recipe.decision.steak,
    //required
    elementDefault: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/decision/pasta'
  };
  res.render('decision/steak', data);
});

/*
 *Description: open decision's sub lesson 2.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/pasta', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.decision;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.pasta,
    element: configString[lang].element.decision.pasta,
    recipe: configString[lang].recipe.decision.pasta,
    //required
    elementDefault: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/decision/decision-3'
  };
  res.render('decision/pasta', data);
});

/*
 *Description: open decision's sub lesson 3.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/decision-3', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.decision;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.decision_3,
    elementDefault: configString[lang].element.general,
    //required
    general: configString[lang].general,
    errorMsg: configString[lang].error,
    nextPage: '/home'
  };
  res.render('decision/decision-3', data);
});

module.exports = router;