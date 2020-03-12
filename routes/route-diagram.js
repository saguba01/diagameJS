var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var setting = require('../public/javascripts/setting');
/*
 *Description: open diagram question.
 *@version 2.0
 *@author Thongthorn Karapakdee
 *@since 6 December 2019
 *@required node.js,ExpressJS.
 */
router.get('/:id', authen, async function (req, res, next) {
  let lang = req.cookies.lang;
  const general = await setting.getSetting(lang)
  //let lesson = configString[lang].lesson.logic;

  let refQuestion = firestore.collection("Diagram");
  var arrAnswer = [];
  let keyId = 0;
  const score = await getScore();
  const stepMenu = await getFlowchartStep(lang)
  refQuestion.doc(req.params.id).collection("answer").get().then(function (Doc) {
    keyId = Doc.size;
    for (let index = 1; index <= keyId; index++) {
      refQuestion.doc(req.params.id).collection("answer").doc(index.toString()).get().then(function (doc2) {
        arrAnswer.push(doc2.data().answerStep)
      });
    }
    //console.log("Answer => ", arrAnswer);
  })

  refQuestion.doc(req.params.id).get().then(function (doc) {
    refQuestion.doc(req.params.id).collection("answer").doc("1").get().then(function (doc3) {
      setTimeout(function () {
        var data = {
          lang: lang,
          layout: 'default',
          navBar: true,
          user: req.session.user,
          question: doc3.data().answerStep,
          questionHintEN: doc.data().HintEN,
          questionNameEN: doc.data().NameEN,
          questionHintTH: doc.data().HintTh,
          questionNameTH: doc.data().NameTH,
          level: doc.data().Level,
          answerStep: arrAnswer,
          length: doc3.data().answerStep.length,
          maxScore: score.maxScore,
          minScore: score.minScore,
          questionId: req.params.id,
          setting: general.setting,
          button: general.button,
          elementsString: configString[lang].element.general,
          general: configString[lang].general,
          achievementList: configString[lang].achievement,
          errorMsg: configString[lang].error,
          flowchartStep: stepMenu,
          //nextPage: '/lesson/decision/coffee'
        };
        res.render('newDiagram/diagramById', data);
      }, 1000);

    });
  });
});

async function getScore() {
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

async function getSetting(lang = 'en') {
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

async function getFlowchartStep(lang) {
  var step = [];
  let refstep = firestore.collection('System').doc('Config')
    .collection('Menu').doc('tutorial')
    .collection('flowchartStep').doc(lang)
  await refstep.get().then(doc => {
    if (!doc.exists) {
      step.push('No such document!')
    } else {
      step.push(doc.data())
    }
  })
    .catch(err => {
      step.push(err)
    });
  return step[0]
}
module.exports = router;