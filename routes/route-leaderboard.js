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
    //required
    lesson: {
      text: "Leaderboard"
    },
    general: configString[lang].general,
    errorMsg: configString[lang].error,
    history:await getHistory()
  };
  res.render('leaderboard/index', data);
});

async function getHistory() {
    var history = [];
    let refhistory = firestore.collection('ScoreHistory');
    refhistory.get().then((doc) => {
        doc.forEach((element) => {
          history.push(element.data());
        })
    })
    return history;
}

  module.exports = router;