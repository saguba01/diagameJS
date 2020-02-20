var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;

/*
 *Description: open logic's introduction.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 January 2019
 *@required node.js,ExpressJS.
 */
router.get('/easy', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.logic;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.easy,
    question: configString[lang].question.logic.easy,
    //required
    elementsString: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/logic/nomal'
  };
  res.render('logic/easy', data);
});

/*
 *Description: open logic's sub lesson 1.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/nomal', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.logic;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.nomal,
    question: configString[lang].question.logic.nomal,
    //required
    elementsString: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/logic/hard'
  };
  res.render('logic/nomal', data);
});

/*
 *Description: open logic's sub lesson 2.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/hard', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.logic;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.hard,
    question: configString[lang].question.logic.hard,
    //required
    elementsString: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/logic/advance'
  };
  res.render('logic/hard', data);
});

/*
 *Description: open logic's sub lesson 3.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 March 2019
 *@required node.js,ExpressJS.
 */
router.get('/advance', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.logic;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: lesson,
    subLesson: lesson.subLesson.advance,
    question: configString[lang].question.logic.advance,
    //required
    elementsString: configString[lang].element.general,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    nextPage: '/lesson/decision/coffee'
  };
  res.render('logic/advance', data);
});

/*
 *Description: open logic's sub lesson 3.
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 7 Feb 2020
 *@required node.js,ExpressJS.
 */
router.get('/:id', authen,async function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.logic;
  let refQuestion = firestore.collection("Logic");
  let questionData;
  const score = await getScore();
  const general = await getSetting(lang);

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
      questionId: req.params.id,
      maxScore : score.maxScore,
      minScore :score.minScore,
      setting : general.setting,
      button : general.button
    };
    res.render('logic/logicById', data);
  });
});

async function getScore(){
  let score = null;
  const refscore = firestore.collection('System').doc('Score')
  // /System/Score
  await refscore.get().then(doc => {
    if (!doc.exists) {
      score = false
    } else {
      score = doc.data()
    }
  })
  .catch(err => {
    score = false
  });
  return score
}

async function getSetting(lang='en'){
  // /System/Config/general/en
  let general = [];
  const refgeneral = firestore.collection('System').doc('Config')
                      .collection('general').doc(lang)
  await refgeneral.get().then(doc => {
    if (!doc.exists) {
      general.push(false)
    } else {
      general.push(doc.data())
    }
  })
  .catch(err => {
    general.push(false)
  });
  return general[0]
}


module.exports = router;
