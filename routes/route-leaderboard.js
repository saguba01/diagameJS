var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;


router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  var data = {
    layout: 'default',
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    //required
    unlock: await getAchievement(req.session.user.uid),
    passed: await getPassed(req.session.user.uid),
    lesson: configString[lang].lesson,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    ListMenu : JSON.stringify(await getMenu())
  };
  res.render('leaderboard/index', data);
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

  module.exports = router;