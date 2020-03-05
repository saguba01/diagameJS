var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var user_info = require('../public/javascripts/userInfo');
var genaral = require('../public/javascripts/genaral');

/* 
 * name: homePage
 * description: open home page
 * author: Bulakorn M.
 * create date: 25/01/2019
 * 
 * name: Edit list Question
 * author: Jirapat L.
 * modify date: 12/02/2020
 */
router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const general = await genaral.getGanaral(lang)
  const uid = req.session.user.uid;
  const user = await user_info.userInfo(uid)
  try{
    switch(user.status) {
      case 'sucess':
        const userInfo = user.data
        console.log(`playTutorial type : ${typeof userInfo.playTutorial} ${userInfo.playTutorial}`)
        console.log(`!userInfo.playTutorial : ${!userInfo.playTutorial}`)
        console.log(`userInfo.playTutorial == undefined : ${typeof userInfo.playTutorial == undefined}`)
        console.log(`userInfo.playTutorial =="undefined" : ${typeof userInfo.playTutorial =="undefined"}`)
          if(!userInfo.playTutorial && typeof userInfo.playTutorial !="undefined"){
            var data = {
              layout: 'default',
              navBar: true,
              user: req.session.user,
              element: configString[lang].element.general,
              intro: configString[lang].intro,
              questionLogic: await getLogic(lang),
              questionOperator: await getOperator(lang),
              questionDiagram: await getDiagram(lang),
              //required
              unlock: await getAchievement(req.session.user.uid),
              passed: await getPassed(req.session.user.uid),
              score: await getScore(req.session.user.uid),
              feedback: general.feedback,
              lesson: configString[lang].lesson,
              general: configString[lang].general,
              achievementList: configString[lang].achievement,
              errorMsg: configString[lang].error,
              ListMenu : JSON.stringify(await getMenu()),
              ListMenu: JSON.stringify(await getMenu()),
              setting:general.setting,
              button:general.button
            };
            res.render('home/index', data);
          }else{
            res.redirect('/tutorial');
          }
        break;
      case 'waring':
        
        break;
      default:
        console.error({
          status : user.status,
          massage : user.massage
        })
        break;
    }
    
  }catch(e){
    console.error(e)
  }
});

router.post('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  await getPassed(req.session.user.uid);
  const general = await genaral.getGanaral(lang)
  var data = {
    layout: 'default',
    user: req.session.user,
    page: req.body.page, //req.session.homePost != req.body.page ? req.body.page : undefined,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    questionLogic: await getLogic(),
    questionOperator: await getOperator(),
    questionDiagram: await getDiagram(lang),
    feedback:general.feedback,
    //required
    unlock: await getAchievement(req.session.user.uid),
    passed: await getPassed(req.session.user.uid),
    score: await getScore(req.session.user.uid),
    lesson: configString[lang].lesson,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
  };
  req.session.homePost = req.body.page;
  res.render('home/index', data);
});

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

async function getMenu() {
  var Menu = [];
  let refMenu = firestore.collection('Menu').doc('LVDQgvkSIhBEq2loFUI6')

  await refMenu.get().then(function (doc) {
    if (!doc.exists) {
      Menu.push('No such document!');
    } else {
      Menu.push(doc.data());
    }

  }).catch(function (error) {
    console.log(error);
    Menu.push(error);
  });
  return Menu;
}

async function getLogic(lang) {
  var question = [];
  let refquestion = firestore.collection('Logic').orderBy('Level');
  await refquestion.get().then((doc) => {
    doc.forEach(element => {
      if (element.data().Type == "logic") {
        if (lang == 'en') {
          question.push({
            Name: element.data().NameEN,
            Type: element.data().Type,
            Level: element.data().Level,
            Id: element.id
          })
        }else if(lang == 'th'){
          question.push({
            Name: element.data().NameTH,
            Type: element.data().Type,
            Level: element.data().Level,
            Id: element.id
          })
        }
      }
    })
  });
  return question;
}

async function getOperator(lang) {
  var question = [];
  let refquestion = firestore.collection('Logic').orderBy('Level');
  refquestion.get().then((doc) => {
    doc.forEach(element => {
      if (element.data().Type == "operator") {
        if (lang == 'en') {
          question.push({
            Name: element.data().NameEN,
            Type: element.data().Type,
            Level: element.data().Level,
            Id: element.id
          })
        }else if(lang == 'th'){
          question.push({
            Name: element.data().NameTH,
            Type: element.data().Type,
            Level: element.data().Level,
            Id: element.id
          })
        }
      }
    })
  });
  return question;
}

async function getScore(uid) {
  var score = [];
  let refscore = firestore.collection('ScoreHistory');
  refscore.get().then(doc => {
    doc.forEach(element => {
      if (element.data().uid == uid) {
        score.push(element.data())
      }
    })
  })
  return score;
}

async function getDiagram(lang) {
  var diagram = [];
  let refdiagram = firestore.collection('Diagram');
  refdiagram.get().then(doc => {
    doc.forEach(element => {
      if (lang == 'en') {
        diagram.push({
          Name: element.data().NameEng,
          Level: element.data().Level
        });
      } else if (lang == 'th') {
        diagram.push({
          Name: element.data().NameTh,
          Level: element.data().Level
        });
      }
    })
  })
  return diagram;
}

module.exports = router;