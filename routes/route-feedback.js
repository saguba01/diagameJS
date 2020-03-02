var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var setting = require('../public/javascripts/setting');


router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const general = await setting.getSetting(lang)
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    feedback : await getFeedback(),
    //required
    lesson:{
      text:"Feedback",
    },
    setting:general.setting,
    button:general.button,
    general: configString[lang].general,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    ListMenu : JSON.stringify(await getMenu())
  };
  res.render('feedback/show_feedback', data);
});

router.get('/datafeedback', function (req, res, next) {
  var feedback = [];
  let reffb = firestore.collection('Feedback')
  reffb.get().then((doc)=>{
        doc.forEach(element => {
          feedback.push(element.data())
        })
  });
  res.send(feedback);
});

async function getFeedback(){
    var feedback = [];
    let reffb = firestore.collection('Feedback')
    reffb.get().then((doc)=>{
          doc.forEach(element => {
            feedback.push(element.data())
          })
    });
    return feedback;
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