var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;

/* 
 * name: homePage
 * description: open home page
 * author: Bulakorn M.
 * create date: 25/01/2019
 * modify date: 25/01/2019
 */
router.get('/', authen, async (req, res, next) => {
    let lang = req.cookies.lang;

    let  menu = await getMenuTutorial()
    menu = menu[0]
    var data = {
      navBar : true,
      layout: 'default',
      user: req.session.user,
      element: configString[lang].element.general,
      intro: configString[lang].intro,
      //required
      unlock: await getAchievement(req.session.user.uid),
      passed: await getPassed(req.session.user.uid),
      lesson: menu,
      test:JSON.stringify(menu) ,
      general: configString[lang].general,
      achievementList: configString[lang].achievement,
      errorMsg: configString[lang].error,
    };
    
    res.render('tutorial/index', data);
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
  
  async function getMenuTutorial() {
    var Menu = [];
    let refMenu = firestore.collection('System').doc('Config')
        .collection('Menu').doc('tutorial')
    await refMenu.get().then(doc => {
      if (!doc.exists) {
        Menu.push('No such document!')
      } else {
        Menu.push(doc.data())
      }
    })
    .catch(err => {
      Menu.push(err)
    });
    return Menu;
  }
  
  module.exports = router;