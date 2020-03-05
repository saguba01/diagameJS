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
            var data = {
                lang: lang,
                layout: 'default',
                navBar: true,
                user: req.session.user,
                question: doc3.data().answerStep,
                questionHintEng: doc.data().HintEng,
                questionNameEng: doc.data().NameEng,
                questionHintTh: doc.data().HintTh,
                questionNameTh: doc.data().NameTh,
                answerStep: arrAnswer,
                length: doc3.data().answerStep.length,
                maxScore: score.maxScore,
                minScore: score.minScore,
                setting: general.setting,
                button: general.button,
                elementsString: configString[lang].element.general,
                general: configString[lang].general,
                achievementList: configString[lang].achievement,
                errorMsg: configString[lang].error,
                //nextPage: '/lesson/decision/coffee'
            };
            res.render('newDiagram/diagramById', data);
        });
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