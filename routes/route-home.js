var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var user_info = require('../public/javascripts/userInfo');
/* 
 * name: homePage
 * description: open home page
 * author: Bulakorn M.
 * create date: 25/01/2019
 * 
 * author: Jirapat L.
 * modify date: 12/02/2020
 */
router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const uid = req.session.user.uid;
  const user = await user_info.userInfo(uid)
  try{
    switch(user.status) {
      case 'sucess':
        const userInfo = user.data
        if(!userInfo.playTutorial){
          var data = {
            layout: 'default',
            user: req.session.user,
            element: configString[lang].element.general,
            intro: configString[lang].intro,
            questionLogic: await getLogic(),
            questionOperator: await getOperator(),
            //required
            unlock: await getAchievement(req.session.user.uid),
            passed: await getPassed(req.session.user.uid),
            score: await getScore(req.session.user.uid),
            lesson: configString[lang].lesson,
            general: configString[lang].general,
            achievementList: configString[lang].achievement,
            errorMsg: configString[lang].error,
            ListMenu : JSON.stringify(await getMenu()),
          };
          res.render('home/index', data);
        }else{
          res.redirect('/tutorial');
        }
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

router.post('/', authen,async (req, res, next) => {
  let lang = req.cookies.lang;
  await getPassed(req.session.user.uid);
  var data = {
    layout: 'default',
    user: req.session.user,
    page: req.body.page, //req.session.homePost != req.body.page ? req.body.page : undefined,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    questionLogic: await getLogic(),
    questionOperator: await getOperator(),
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

async function getLogic(){
    var question = [];
    let refquestion = firestore.collection('Logic').orderBy('Level');
    await refquestion.get().then((doc)=>{
          doc.forEach(element => {
            if(element.data().Type == "logic"){
            question.push({
              Name:element.data().Name,
              Type:element.data().Type,
              Level:element.data().Level,
              Id : element.id
            })
            }
          })  
    });
    return question;
}

async function getOperator(){
  var question = [];
  let refquestion = firestore.collection('Logic').orderBy('Level');
  refquestion.get().then((doc)=>{
        doc.forEach(element => {
          if(element.data().Type == "operator"){
            question.push({
              Name:element.data().Name,
              Type:element.data().Type,
              Level:element.data().Level,
              Id : element.id
            })
          }
        })
  });
  return question;
}

async function getScore(uid){
    var score = [];
    let refscore = firestore.collection('ScoreHistory');
    refscore.get().then(doc=>{
      doc.forEach(element => {
        if(element.data().uid == uid){
        score.push(element.data())
        }
      })
    })
  return score;
}


module.exports = router;