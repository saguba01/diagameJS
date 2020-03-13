var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var user_info = require('../public/javascripts/userInfo');

/* 
 * name: index of tutorial
 * description: Show main tutorial screen
 * author: Supachai Boonying
 * create date: 20/02/2020
 * modify date: 13/03/2020
 */
router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const stringConfig = configString[lang]
  try {
    var data = {
      navBar: true,
      diagameIntro: false,
      introStep: stringConfig.general.tutorial.introStep,
      layout: 'default',
      user: req.session.user,
      element: stringConfig.element.general,
      intro: stringConfig.intro,
      walcomeModal: stringConfig.general.tutorial.welcome,
      general: stringConfig.general,
      langInUsing: lang,
      lesson: {
        text: stringConfig.general.tutorial.text
      },
      listMenu: stringConfig.general.tutorial.listMenu,
      language: stringConfig.general.tutorial.language,
      setting: stringConfig.general.setting,
      button: stringConfig.general.button,
      achievementList: configString[lang].achievement,
      errorMsg: configString[lang].error,
    };
  } catch (e) {
    console.error(e)
  }
  res.render('tutorial/index', data);
});

/* 
* name: logic
* description: Show logic tutorial screen
* author: Supachai Boonying
* create date: 20/02/2020
* modify date: 13/03/2020
*/
router.get('/logic', authen, async (req, res, next) => {
  const lang = req.cookies.lang;
  const stringConfig = configString[lang]
  const score = await getScore()
  const data = {
    diagameIntro: false,
    navBar: true,
    layout: 'default',
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    lesson: {
      text: stringConfig.general.tutorial.text
    },
    subLesson: {
      text: stringConfig.general.tutorial.logicalStep.title
    },
    totalQuestion: 1,
    maxScore: score.maxScore,
    logicalStep: stringConfig.general.tutorial.logicalStep,
    question: [await getQuestionLogic()],
    general: configString[lang].general,
    langInUsing: lang,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    setting: stringConfig.general.setting,
    button: stringConfig.general.button,
    nextPage: '/tutorial/flowchart'
  };

  res.render('tutorial/logic', data);
});

/* 
* name: logic
* description: Show flowchart tutorial screen
* author: Supachai Boonying
* create date: 20/02/2020
* modify date: 13/03/2020
*/
router.get('/flowchart', authen, async (req, res, next) => {
  const lang = req.cookies.lang;
  const score = await getScore()
  const stringConfig = configString[lang]
  const data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    lesson: {
      text: 'Tutorial',
      url: 'variable'
    },
    subLesson: {
      text: 'flowchart',
      url: 'tutorial'
    },
    maxScore: score.maxScore,
    minScore: score.minScore,
    element: configString[lang].element.variable.juice,
    intro: configString[lang].intro,
    recipe: configString[lang].recipe.variable.juice,
    //required
    flowchartStep: stringConfig.general.tutorial.flowchartStep,
    elementDefault: configString[lang].element.general,
    general: configString[lang].general,
    langInUsing: lang,
    achievementList: configString[lang].achievement,
    errorMsg: configString[lang].error,
    setting: stringConfig.general.setting,
    button: stringConfig.general.button,
    nextPage: ''
  };
  res.render('tutorial/flowchart', data);
});


/* 
 * name: passTutorail
 * description: user pass tutorial
 * author: Supachai Boonying
 * create date: 20/02/2020
 * modify date: 13/03/2020
 */
router.get('/passTutorail', async (req, res, next) => {

  const uid = req.session.user.uid;
  const user = await user_info.userInfo(uid)
  const userInfoData = user.data
  let userInfo = {
    avatar: "robot-01.svg",
    nickname: "",
    playTutorial: false,
    role: "user"
  }
  try {
    if (typeof userInfoData.role != "undefined" && userInfoData.role == "admin") {
      userInfo.role = "admin"
    }
  } catch (e) {
    console.warn("404 document")
  }


  userInfo.playTutorial = false
  res.send(await user_info.passTutorail(uid, userInfo));
})

/* 
 * name: getQuestionLogic
 * description: get question of logic
 * author: Supachai Boonying
 * create date: 20/02/2020
 * modify date: 13/03/2020
 */
async function getQuestionLogic() {
  var logic = [];
  let refstep = firestore.collection('System').doc('Config')
    .collection('Menu').doc('tutorial')
    .collection('question').doc('newplayer')
  await refstep.get().then(doc => {
    if (!doc.exists) {
      logic.push('No such document!')
    } else {
      logic.push(doc.data())
    }
  })
    .catch(err => {
      logic.push(err)
    });
  return logic[0]
}

/* 
 * name: getScore
 * description: get config score 
 * author: Supachai Boonying
 * create date: 20/02/2020
 * modify date: 13/03/2020
 */
async function getScore() {
  let score = null;
  const refscore = firestore.collection('System').doc('Score')
  await refscore.get().then(doc => {
    if (!doc.exists) {
      score = false
    } else {
      score = doc.data()
    }
  })
    .catch(err => {
      console.error(err.message)
      score = false
    });
  return score
}

module.exports = router;