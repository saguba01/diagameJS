var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var genaral = require('../public/javascripts/genaral');
var score = require('../public/javascripts/score');
var questionFlowchart = require('../public/javascripts/question-flowchart');
var questionLogic = require('../public/javascripts/question-logic');

router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const general = await genaral.getGanaral(lang)
  var data = {
    layout: 'default',
    navBar : true,
    slideBar : true,
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    //required
    unlock: await getAchievement(req.session.user.uid),
    passed: await getPassed(req.session.user.uid),
    lesson: configString[lang].lesson,
    general: general,
    setting : general.setting,
    button : general.button,
    slidebar: general.slidebar,
    dashboard : general.dashboard,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
  };
  res.render('admin/index', data);
});

router.get('/flowchart', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const general = await genaral.getGanaral(lang)
  const allFlowchart = await questionFlowchart.getAllFlowchart(lang)
  var data = {
    layout: 'default',
    navBar : true,
    slideBar : true,
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    //required
    unlock: await getAchievement(req.session.user.uid),
    passed: await getPassed(req.session.user.uid),
    lesson: configString[lang].lesson,
    general: general,
    setting : general.setting,
    button : general.button,
    slidebar: general.slidebar,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    allFlowchart : JSON.stringify(allFlowchart)
  };
  res.render('admin/flowchartManagent', data);
});

router.get('/logic', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const general = await genaral.getGanaral(lang)
  const allLogic = await questionLogic.getAllLogic(lang)
  var data = {
    layout: 'default',
    navBar : true,
    slideBar : true,
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    //required
    unlock: await getAchievement(req.session.user.uid),
    passed: await getPassed(req.session.user.uid),
    lesson: configString[lang].lesson,
    general: general,
    setting : general.setting,
    button : general.button,
    slidebar: general.slidebar,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    allLogic : JSON.stringify(allLogic)
  };
  res.render('admin/LogicManagement', data);
});

router.get('/score', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const general = await genaral.getGanaral(lang)
  const scoreData = await score.getScore()
  var data = {
    layout: 'default',
    navBar : true,
    slideBar : true,
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    //required
    unlock: await getAchievement(req.session.user.uid),
    passed: await getPassed(req.session.user.uid),
    lesson: configString[lang].lesson,
    general: general,
    setting : general.setting,
    score : scoreData.data,
    button : general.button,
    slidebar: general.slidebar,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    allLogic : JSON.stringify(allLogic),
    test : JSON.stringify(scoreData.data),
  };
  res.render('admin/scoreManagement', data);
});

router.post('/saveScore', (req, res, next) => {
  const postData = req.body
  let refScore = firestore.collection("System").doc("Score") 
  let respones = {
    status : "",
    massage : ""
  }

  refScore.set({
      maxScore : postData.maxScore,
      minScore : postData.minScore,
      level : postData.level
  }).then(()=>{
    respones.status = "success"
    res.send(respones);
  }).catch((e)=>{
    respones.status = "error"
    respones.massage = e
    res.send(respones);
  })
 
  // 
})

async function getAchievement(uid) {
  var unlock = [];
  let refAchieve = firestore.collection("lessons").doc(uid).collection('achievements');
  await refAchieve.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      unlock.push(doc.data());
    });
  }).catch(function (error) {
    console.log(error);
    unlock = [];
  });
  return unlock;
}

async function getPassed(uid) {
  var passed = [];
  let refAchieve = firestore.collection("lessons").doc(uid).collection('passed');
  await refAchieve.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      passed.push(doc.id);
    });
  }).catch(function (error) {
    console.log(error);
    passed = [];
  });
  return passed;
}

  module.exports = router;