var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var genaral = require('../public/javascripts/genaral');
var score = require('../public/javascripts/score');
var user_info = require('../public/javascripts/userInfo');
var questionFlowchart = require('../public/javascripts/question-flowchart');
var questionLogic = require('../public/javascripts/question-logic');
var dashboard = require('../public/javascripts/dashboard');
var sortId = require('../public/javascripts/sortId')

router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const uid = req.session.user.uid;
  const stringConfig = configString[lang]
  const general = await genaral.getGanaral(lang)
  const user = await user_info.userInfo(uid)
  try {
    switch (user.status) {
      case 'success':
        if (user.data.role == "admin") {
          const allUser = await dashboard.getNumOfUser()
          const allFlowchart = await questionFlowchart.getAllFlowchart(lang)
          const allLogic = await questionLogic.getAllLogic(lang)
          let allQuestion = []

          allFlowchart.forEach((value)=>{
            allQuestion.push(value)
          })

          allLogic.forEach((value)=>{
            allQuestion.push(value)
          })
          var data = {
            layout: 'default',
            navBar: true,
            slideBar: true,
            user: req.session.user,
            element: configString[lang].element.general,
            intro: configString[lang].intro,  
            lesson: configString[lang].lesson,
            general: stringConfig.general,
            setting: stringConfig.general.setting,
            button: stringConfig.general.button,
            slidebar: stringConfig.general.slidebar,
            dashboard: stringConfig.general.dashboard,
            months: JSON.stringify(stringConfig.general.months),
            cardData: {
              total_user: allUser.length,
              total_question: parseInt(allFlowchart.length) + parseInt(allLogic.length),
              listUser : JSON.stringify(allUser),
              listQuestion : JSON.stringify(allQuestion)
            },
            achievementList: configString[lang].achievement,
            errorMsg: configString[lang].error,
          };
          res.render('admin/index', data);
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
    // res.redirect('/');
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('shared/error');
  }
});

router.get('/flowchart', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const general = await genaral.getGanaral(lang)
  const allFlowchart = await questionFlowchart.getAllFlowchart(lang)
  const uid = req.session.user.uid;
  const user = await user_info.userInfo(uid)
  const stringConfig = configString[lang]
  try {
    if (user.status == "success" && user.data.role == "admin") {
      var data = {
        layout: 'default',
        navBar: true,
        slideBar: true,
        user: req.session.user,
        element: configString[lang].element.general,
        intro: configString[lang].intro,
        //required
        lesson: configString[lang].lesson,
        general: general,
        setting: stringConfig.general.setting,
        button: stringConfig.general.button,
        slidebar: general.slidebar,
        achievementList: configString[lang].achievement,
        errorMsg: configString[lang].error,
        allFlowchart: JSON.stringify(allFlowchart)
      };
      res.render('admin/flowchartManagent', data);
    } else {
      res.render('shared/page_404');
    }
  } catch (e) {
    console.error(e)
    res.render('shared/error');
  }

});

router.get('/logic', authen, async (req, res, next) => {

  let lang = req.cookies.lang;
  const uid = req.session.user.uid;
  const user = await user_info.userInfo(uid)
  const allLogic = await questionLogic.getAllLogic(lang)
  const stringConfig = configString[lang]
  try {
    if (user.status == "success" && user.data.role == "admin") {
      var data = {
        layout: 'default',
        navBar: true,
        slideBar: true,
        user: req.session.user,
        element: configString[lang].element.general,
        intro: configString[lang].intro,
        lesson: configString[lang].lesson,
        general: stringConfig.general,
        setting: stringConfig.general.setting,
        button: stringConfig.general.button,
        slidebar: stringConfig.general.slidebar,
        achievementList: configString[lang].achievement,
        errorMsg: configString[lang].error,
        allLogic: JSON.stringify(allLogic)
      };
      res.render('admin/LogicManagement', data);
    } else {
      res.render('shared/page_404');
    }
  } catch (e) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('shared/error');
  }

});

router.get('/score', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  const scoreData = await score.getScore()
  const uid = req.session.user.uid;
  const user = await user_info.userInfo(uid)
  // const allLogic = await questionLogic.getAllLogic(lang)
  const stringConfig = configString[lang]
  try {
    if (user.status == "success" && user.data.role == "admin") {
      var data = {
        layout: 'default',
        navBar: true,
        slideBar: true,
        user: req.session.user,
        element: configString[lang].element.general,
        intro: configString[lang].intro,
        lesson: configString[lang].lesson,
        general: stringConfig.general,
        setting: stringConfig.general.setting,
        button: stringConfig.general.button,
        score: scoreData.data,
        slidebar: stringConfig.general.slidebar,
        achievementList: configString[lang].achievement,
        errorMsg: configString[lang].error,
        // allLogic: JSON.stringify(allLogic),
      };
      res.render('admin/scoreManagement', data);
    } else {
      res.render('shared/page_404');
    }
  } catch (e) {
    res.locals.message = e.message;
    res.locals.error = req.app.get('env') === 'development' ? e : {};

    // render the error page
    res.status(e.status || 500);
    res.render('shared/error');
  }

});

router.post('/saveScore', (req, res, next) => {
  const postData = req.body
  let refScore = firestore.collection("System").doc("Score")
  let respones = {
    status: "",
    massage: ""
  }

  refScore.set({
    maxScore: postData.maxScore,
    minScore: postData.minScore,
    level: postData.level
  }).then(() => {
    respones.status = "success"
    res.send(respones);
  }).catch((e) => {
    respones.status = "error"
    respones.massage = e
    res.send(respones);
  })
  // 
})

router.get('/getAllLogicPie', async (req, res, next) => {
  try {
    let lang = req.cookies.lang;
    const general = await genaral.getGanaral(lang)
    const allFlowchart = await questionFlowchart.getAllFlowchart(lang)
    const allLogic = await questionLogic.getAllLogic(lang)
    let logic = []
    let operator = []
    let other = []
    allLogic.forEach((value) => {
      switch (value.type) {
        case "operator":
          operator.push(value)
          break;
        case "logic":
          logic.push(value)
          break;
        default:
          other.push(value)
          break;
      }
    })
    let compareTitle = general.dashboard.report.pie.compare_questions.compare
    res.send([
      {
        title: compareTitle.flowchart,
        type: "flowchart",
        data: allFlowchart
      },
      {
        title: compareTitle.logic,
        type: "logic",
        data: logic
      },
      {
        title: compareTitle.operator,
        type: "operator",
        data: operator
      },
      {
        title: compareTitle.other,
        type: "other",
        data: other
      }
    ]);
  } catch (e) {
    console.warn(e)
    res.send({
      status: "error",
      massage: e
    });
  }
})

router.get('/getscroeHistory', async (req, res, next) => {
  try {
    let lang = req.cookies.lang;
    const scroeHistory = await dashboard.getscroeHistory()
    const genaralList = await genaral.getGanaral(lang)
    let flowchart = []
    let logic = []
    let operator = []
    let other = []
    scroeHistory.forEach((value) => {
      switch (value.type) {
        case "diagram":
          flowchart.push(value)
          if (flowchart.length > 0) {
            flowchart.sort(sortId.compareValues("id"))
          }
          break;
        case "operator":
          operator.push(value)
          if (operator.length > 0) {
            operator.sort(sortId.compareValues("id"))
          }
          break;
        case "logic":
          logic.push(value)
          if (logic.length > 0) {
            logic.sort(sortId.compareValues("id"))
          }
          break;
        default:
          other.push(value)
          if (other.length > 0) {
            other.sort(sortId.compareValues("id"))
          }
          break;
      }
    })
    let compareTitle = genaralList.dashboard.report.pie.compare_questions.compare
    res.send([
      {
        title: compareTitle.flowchart,
        type: "flowchart",
        data: flowchart
      },
      {
        title: compareTitle.logic,
        type: "logic",
        data: logic
      },
      {
        title: compareTitle.operator,
        type: "operator",
        data: operator
      },
      {
        title: compareTitle.other,
        type: "other",
        data: other
      }
    ]);
  } catch (e) {
    console.warn(e)
    res.send({
      status: "error",
      massage: e
    });
  }
})

router.get('/rateScore', async (req, res, next) => {
  const scoreData = await score.getScore()
  res.send(scoreData)
})

router.get('/listUserAll', async (req, res, next) => {
  const user = await user_info.allUser((obj)=>{
    res.status(200).send(obj)
  })
})

router.get('/updateAllUser', async (req, res, next) => {
  const user = await user_info.updateUser()
  res.status(200).send('OK')
})
router.post('/checkUser', async (req, res, next) => {
  const postData = req.body
  const uid = postData.uid
  const user = await user_info.checkUser(uid)
  res.status(200).send('OK')
})

router.post('/roleUser', async (req, res, next) => {
  const postData = req.body
  let user = null;
  const refUser = firestore.collection('UserInfo').doc(postData.uid)
  await refUser.get().then(doc => {
    if (!doc.exists) {
      user = {
        status: "waring",
        massage: "not have data"
      }
    } else {
      user = {
        status: "sucess",
        data: doc.data()
      }
    }
  })
    .catch(err => {
      user = {
        status: "sucess",
        massage: err,
        data: null
      }
    });
    res.send(user)
  // 
})
module.exports = router;