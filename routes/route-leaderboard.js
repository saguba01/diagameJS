var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;


router.get('/', authen, async (req, res, next) => {
  let lang = req.cookies.lang;
  var data = {
    layout: 'default',
    navBar: true,
    user: req.session.user,
    element: configString[lang].element.general,
    intro: configString[lang].intro,
    score:await getScore(),
    //required
    lesson: {
      text: "Leaderboard"
    },
    general: configString[lang].general,
    errorMsg: configString[lang].error,
  };
  res.render('leaderboard/index', data);
});

async function getScore(){
  var score = [];
  let refscore = firestore.collection('ScoreHistory');
  refscore.get().then(doc=>{
    doc.forEach(element => {
      score.push(element.data());
    })
  })
  return score;
}

  module.exports = router;