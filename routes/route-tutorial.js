var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var setting = require('../public/javascripts/setting');
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
    const general = await setting.getSetting(lang)
    let  menu = await getMenuTutorial()
    try{
      var data = {
        navBar : true,
        diagameIntro : false,
        introStep :await getintroStep(lang),
        layout: 'default',
        
        user: req.session.user,
        element: configString[lang].element.general,
        intro: configString[lang].intro,
        //required
        unlock: await getAchievement(req.session.user.uid),
        passed: await getPassed(req.session.user.uid),
        lesson: menu,
        // loginPage: true,
        walcomeModal : await getWalcome(lang),
        general: configString[lang].general,
        language: await getLang(lang),
        langInUsing: lang,
        setting : general.setting,
        button : general.button,
        achievementList: configString[lang].achievement,
        errorMsg: configString[lang].error,
      };
    }catch(e){
      console.log(`lang => ${lang}`)
      console.log(e)
    }
    res.render('tutorial/index', data);
  });
  
  router.get('/logic', authen, async (req, res, next) => {
    const lang = req.cookies.lang;
    const score = await getScore()
    const general = await setting.getSetting(lang)

    const data = {
      diagameIntro : false,
      introStep :await getintroStep(lang),
      navBar : true,
      layout: 'default',
      user: req.session.user,
      element: configString[lang].element.general,
      intro: configString[lang].intro,
      lesson: {
        text : 'Tutorial'
      },
      subLesson: {
        text : 'logic'
      },
      totalQuestion: 1,
      maxScore : score.maxScore,
      minScore :score.minScore,
      //required
      logicalStep : await getLogicStep(lang),
      question : [ await getQuestionLogic() ],
      unlock: await getAchievement(req.session.user.uid),
      passed: await getPassed(req.session.user.uid),
      // loginPage: true,
      general: configString[lang].general,
      language: await getLang(lang),
      langInUsing: lang,
      achievementList: configString[lang].achievement,
      errorMsg: configString[lang].error,
      setting : general.setting,
      button : general.button,
      nextPage: '/tutorial/flowchart'
    };
    
    res.render('tutorial/logic', data);
  });

  router.get('/flowchart', authen, async (req, res, next) => {
    const lang = req.cookies.lang;
    const score = await getScore()
    const general = await setting.getSetting(lang)

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
      flowchartStep : await getFlowchartStep(lang),
      elementDefault: configString[lang].element.general,
      general: configString[lang].general,
      langInUsing: lang,
      achievementList: configString[lang].achievement,
      errorMsg: configString[lang].error,
      setting : general.setting,
      button : general.button,
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

  // function 
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
    return Menu[0];
  }
  
  async function getintroStep(lang) {
    //  /System/Config/Menu/tutorial/introStep/th lang.toString()
    var Menu = [];
    let refstep = firestore.collection('System').doc('Config')
        .collection('Menu').doc('tutorial')
       .collection('introStep').doc(lang)
    await refstep.get().then(doc => {
      if (!doc.exists) {
        Menu.push('No such document!') 
      } else {
        Menu.push(doc.data()) 
      }
    })
    .catch(err => {
      Menu.push(err) 
    });
    return Menu[0]
  }

  async function getLang(lang) {
    //  /System/Config/Menu/tutorial/language/en
    var Menu = [];
    let refstep = firestore.collection('System').doc('Config')
        .collection('Menu').doc('tutorial')
       .collection('language').doc(lang)
    await refstep.get().then(doc => {
      if (!doc.exists) {
        Menu.push('No such document!') 
      } else {
        Menu.push(doc.data()) 
      }
    })
    .catch(err => {
      Menu.push(err) 
    });
    return Menu[0]
  }

  
  async function getWalcome(lang) {
    //  /System/Config/Menu/tutorial/language/en
    var Menu = [];
    let refstep = firestore.collection('System').doc('Config')
        .collection('Menu').doc('tutorial')
       .collection('welcome').doc(lang)
    await refstep.get().then(doc => {
      if (!doc.exists) {
        Menu.push('No such document!') 
      } else {
        Menu.push(doc.data()) 
      }
    })
    .catch(err => {
      Menu.push(err) 
    });
    return Menu[0]
  }

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
  
  async function getLogicStep(lang) {
    // /System/Config/Menu/tutorial/logicalStep
    var step = [];
    let refstep = firestore.collection('System').doc('Config')
        .collection('Menu').doc('tutorial')
        .collection('logicalStep').doc(lang)
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

async function getFlowchartStep(lang){
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