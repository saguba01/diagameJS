var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;

/*
 *Description: add
 *@version 1.0
 *@author Thanawin
 *@since 06 December 2019
 *@required node.js,ExpressJS.
 */

router.get('/add', authen, function (req, res, next) {
    let lang = req.cookies.lang;
    let lesson = configString[lang].lesson.logic;
    var data = {
      layout: 'default',
      user: req.session.user,
      //navbar
      navBar: true,
      elementDefault: configString[lang].element.general,
      general: configString[lang].general,
      lesson: lesson,
      subLesson: lesson.subLesson.addlogic
      //
    };
    res.render('manageLogic/addLogic', data);
  });

  /*
 *Description: edit
 *@version 1.0
 *@author Thanawin
 *@since 06 December 2019
 *@required node.js,ExpressJS.
 */

router.get('/edit/:id', authen, function (req, res, next) {
  let lang = req.cookies.lang;
  let lesson = configString[lang].lesson.logic;
  let refQuestion = firestore.collection("Logic");

  //get data for edit
  refQuestion.doc(req.params.id).get().then(function(doc){
    var data = {
      layout: 'default',
      user: req.session.user,
      //navbar
      navBar: true,
      elementDefault: configString[lang].element.general,
      general: configString[lang].general,
      lesson: lesson,
      subLesson: lesson.subLesson.addlogic,
      //data for edit
      logicId: req.params.id,
      answer: doc.data().Answer,
      nameEN: doc.data().NameEN,
      nameTH: doc.data().NameTH,
      question: doc.data().Question,
      level: doc.data().Level
    };
    res.render('manageLogic/editLogic', data);
  });
});
  module.exports = router;