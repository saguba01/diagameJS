var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;

/*
 *Description: open loop's introduction.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 January 2019
 *@required node.js,ExpressJS.
 */
router.get('/smoothie', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.loop;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.smoothie,
    elementsString: configString[lang].element.general,
    //required
    general: configString[lang].general,
    errorMsg: configString[lang].error
  };
  res.render('loop/smoothie', data);
});

/*
 *Description: open loop's sub lesson 1.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/dough', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.loop;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.dough,
    elementsString: configString[lang].element.general,
    //required
    general: configString[lang].general,
    errorMsg: configString[lang].error
  };
  res.render('loop/dough', data);
});

/*
 *Description: open loop's sub lesson 2.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/whipedCream', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.loop;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.whipedCream,
    elementsString: configString[lang].element.general,
    //required
    general: configString[lang].general,
    errorMsg: configString[lang].error
  };
  res.render('loop/whipedCream', data);
});

/*
 *Description: open loop's sub lesson 3.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/eclair', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.loop;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.eclair,
    elementsString: configString[lang].element.general,
    //required
    general: configString[lang].general,
    errorMsg: configString[lang].error
  };
  res.render('loop/eclair', data);
});

module.exports = router;
