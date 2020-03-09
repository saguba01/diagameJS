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
 * modify date: 25/01/2019
 */
router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang; 
    const stringConfig = configString[lang]
    try{
      var data = {
        navBar : true,
        diagameIntro : false,
        introStep :stringConfig.general.tutorial.introStep,
        layout: 'default',
        user: req.session.user,
        element: stringConfig.element.general,
        intro: stringConfig.intro,
        walcomeModal : stringConfig.general.tutorial.welcome,
        general: stringConfig.general,
        langInUsing: lang,
        lesson: {
          text : stringConfig.general.tutorial.text
        },
        listMenu: stringConfig.general.tutorial.listMenu,
        language: stringConfig.general.tutorial.language,
        setting: stringConfig.general.setting,
        button: stringConfig.general.button,
        achievementList: configString[lang].achievement,
        errorMsg: configString[lang].error,
      };
    }catch(e){
      console.error(e)
    }
    res.render('tutorial/index', data);
  });
  
  router.get('/logic', authen, async (req, res, next) => {
    const lang = req.cookies.lang;
    const stringConfig = configString[lang]
    const score = await getScore()
    const data = {
      diagameIntro : false,
      navBar : true,
      layout: 'default',
      user: req.session.user,
      element: configString[lang].element.general,
      intro: configString[lang].intro,
      lesson: {
        text : stringConfig.general.tutorial.text
      },
      subLesson: {
        text : stringConfig.general.tutorial.logicalStep.title
      },
      totalQuestion: 1,
      //required
      maxScore:score.maxScore,
      logicalStep : stringConfig.general.tutorial.logicalStep,
      question : [ await getQuestionLogic() ],
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

  router.get('/flowchart', authen, async (req, res, next) => {
    const lang = req.cookies.lang;
    const score = await getScore()
    const stringConfig = configString[lang]
    const data = {
      layout: 'default',
      navBar: true,
      user: req.session.user,
      lesson: {
        text : 'Tutorial',
        url : 'variable'
      },
      subLesson: {
        text : 'flowchart',
        url : 'tutorial'
      },
      maxScore : score.maxScore,
      minScore :score.minScore,
      element: configString[lang].element.variable.juice,
      intro: configString[lang].intro,
      recipe: configString[lang].recipe.variable.juice,
      //required
      flowchartStep : stringConfig.general.tutorial.flowchartStep,
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
  // service

router.get('/passTutorail', async (req, res, next) => {
  
  const uid = req.session.user.uid;
  const user = await user_info.userInfo(uid)
  const userInfoData = user.data
  let userInfo = {
    avatar : "robot-01.svg",
    nickname : "",
    playTutorial : false,
    role : "user"
  }
  if(typeof userInfoData.role !="undefined" && userInfoData.role == "admin"){
    userInfo.role = "admin"
  }

  userInfo.playTutorial = false
  res.send(await user_info.passTutorail(uid,userInfo));
})


  async function getQuestionLogic() {
      // /System/Config/Menu/tutorial/question/newplayer
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

  module.exports = router;