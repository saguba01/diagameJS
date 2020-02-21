var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;

/*
 *Description: open diagram question.
 *@version 2.0
 *@author Thongthorn Karapakdee
 *@since 6 December 2019
 *@required node.js,ExpressJS.
 */
router.get('/:id', authen, function (req, res, next) {
    let lang = req.cookies.lang;
    //let lesson = configString[lang].lesson.logic;
    let refQuestion = firestore.collection("Diagram");
    let questionData;
    refQuestion.doc(req.params.id).get().then(function (doc) {

        console.log(questionData)
        var data = {
            layout: 'default',
            navBar: true,
            user: req.session.user,
            //lesson: lesson,
            //subLesson: lesson.subLesson.advance,
            question: doc.data().answer,
            questionHint: doc.data().Hint,
            questionName: doc.data().Name,
            length: doc.data().answer.length,
            elementsString: configString[lang].element.general,
            general: configString[lang].general,
            achievementList: configString[lang].achievement,
            errorMsg: configString[lang].error,
            //nextPage: '/lesson/decision/coffee'
        };
        res.render('newDiagram/diagramById', data);

    });
});
module.exports = router;