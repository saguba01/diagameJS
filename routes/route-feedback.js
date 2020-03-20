var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var setting = require('../public/javascripts/setting');
var user_info = require('../public/javascripts/userInfo');


router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const uid = req.session.user.uid;
  const general = await setting.getSetting(lang)
  const user = await user_info.userInfo(uid);
  try {
    switch (user.status) {
      case 'success':
        if (user.data.role == "admin") {
          const userinfo = user.data;
          var data = {
            layout: 'default',
            navBar: true,
            user: req.session.user,
            element: configString[lang].element.general,
            intro: configString[lang].intro,
            feedback: await getFeedback(),
            //required
            lesson: {
              text: configString[lang].general.feedback.title,
            },
            setting: configString[lang].general.setting,
            button: configString[lang].general.button,
            general: configString[lang].general,
            achievementList: configString[lang].achievement,
            errorMsg: configString[lang].error,
            ListMenu: JSON.stringify(await getMenu()),
            name:userinfo.nickname
          };
          res.render('feedback/show_feedback', data);
        } else {
          res.render('shared/page_404');
        }
        break;
      default:
        res.render('shared/page_404');
        console.error({
          status: user.status,
          massage: user.massage
        })
        break;
    }
  } catch (e) {
    console.error(e)
    // render the error page
    res.status(e.status || 500);
    res.render('shared/error');
   }
  });

router.get('/getAllfeedback', authen, async (req, res, next) => {
  const feedback = await getFeedback()
  var arr = []
  feedback.forEach((element) => {
    arr.push(element);
  })
  res.send(arr);
});

async function getFeedback() {
  var feedback = [];
  let reffb = firestore.collection('Feedback').orderBy('date', 'desc');
  await reffb.get().then((doc) => {
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