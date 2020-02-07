var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;


/*
 *Description: open operator's introduction.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 January 2019
 *@required node.js,ExpressJS.
 */
router.get('/easy', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.operator;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.easy,
    question: configString[lang].question.operator.easy,
    //required
    elementsString: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/operator/nomal'
  };
  res.render('operator/easy', data);
});

/*
 *Description: open operator's sub lesson 1.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/nomal', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.operator;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.nomal,
    question: configString[lang].question.operator.nomal,
    //required
    elementsString: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/operator/hard'
  };
  res.render('operator/nomal', data);
});

/*
 *Description: open operator's sub lesson 2.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/hard', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.operator;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.hard,
    question: configString[lang].question.operator.hard,
    //required
    elementsString: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/operator/advance'
  };
  res.render('operator/hard', data);
});

/*
 *Description: open operator's sub lesson 3.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/advance', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.operator;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.advance,
    question: configString[lang].question.operator.advance,
    //required
    elementsString: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/logic/easy'
  };
  res.render('operator/advance', data);
});

/*
 *Description: open Operator's sub lesson 3.
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 7 Feb 2020
 *@required node.js,ExpressJS.
 */
router.get('/:id', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.logic;
  let refQuestion = firestore.collection("Logic");
  let questionData;
  refQuestion.doc(req.params.id).get().then(function(doc){
    questionData = [{
      equation: doc.data().Question,
      answerText: doc.data().Answer,
      answer: doc.data().Answer.toLowerCase()
    }];
    var data = {
      layout: 'default',
      navBar: true,
      user: req.session.user,
      lesson: lesson,
      subLesson: lesson.subLesson.advance,
      question: questionData,
      questionName: doc.data().Name,
      //required
      elementsString: configString[lang].element.general,
      general: configString[lang].general,
      achievementList: configString[lang].achievement,
      errorMsg: configString[lang].error,
      //nextPage: '/lesson/decision/coffee'
    };
    res.render('operator/operatorById', data);
  });
});

module.exports = router;
