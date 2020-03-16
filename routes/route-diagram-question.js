var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var setting = require('../public/javascripts/setting');
var user_info = require('../public/javascripts/userInfo');
/*
 *Description: open diagram question.
 *@version 2.0
 *@author Thongthorn Karapakdee
 *@since 6 December 2019
 *@required node.js,ExpressJS.
 */
router.get('/add', authen, async function (req, res, next) {
    let lang = req.cookies.lang;
    const uid = req.session.user.uid;
    const general = await setting.getSetting(lang)
    const user = await user_info.userInfo(uid)
    let lesson = configString[lang].lesson.diagram;
    const userInfo = user.data;
    var data = {
        layout: 'default',
        navBar: true,
        slideBar: true,
        slidebar: general.slidebar,
        user: req.session.user,
        lesson: lesson,
        subLesson: lesson.subLesson,
        //element: configString[lang].element.variable.juice,
        addForm: configString[lang].manage.diagram,
        //required
        setting: general.setting,
        button: general.button,
        elementDefault: configString[lang].element.general,
        general: configString[lang].general,
        achievementList: configString[lang].achievement,
        errorMsg: configString[lang].error,
        nextPage: '/lesson/variable/cereal',
        name:userInfo.nickname
    };
    res.render('manageDiagram/addDiagram', data);

});

/*
 *Description: open diagram question.
 *@version 2.0
 *@author Thongthorn Karapakdee
 *@since 6 December 2019
 *@required node.js,ExpressJS.
 */
router.get('/edit/:id', authen, async function (req, res, next) {
    let lang = req.cookies.lang;
    const uid = req.session.user.uid;
    const general = await setting.getSetting(lang)
    const user = await user_info.userInfo(uid)
    let lesson = configString[lang].lesson.variable;
    let refQuestion = firestore.collection("Diagram");
    var arrAnswer = [];
    let keyId = 0;
    const userInfo = user.data;
    refQuestion.doc(req.params.id).collection("answer").get().then(function (Doc) {
        keyId = Doc.size;
        for (let index = 1; index <= keyId; index++) {
            console.log("Index => ", index);
            refQuestion.doc(req.params.id).collection("answer").doc(index.toString()).get().then(function (doc2) {
                arrAnswer.push(doc2.data().answerStep)
                console.log("Answer 11111111 => ", arrAnswer);

            });

        }
    })
    setTimeout(function () {
        console.log("Answer => ", arrAnswer);
        refQuestion.doc(req.params.id).get().then(function (doc) {
            var data = {
                layout: 'default',
                navBar: true,
                slideBar: true,
                slidebar: general.slidebar,
                user: req.session.user,
                //lesson: lesson,
                //subLesson: lesson.subLesson.juice,
                //element: configString[lang].element.variable.juice,
                intro: configString[lang].intro,
                recipe: configString[lang].recipe.variable.juice,
                HintEN: doc.data().HintEN,
                HintTH: doc.data().HintTH,
                NameEN: doc.data().NameEN,
                NameTH: doc.data().NameTH,
                level: doc.data().Level,
                answer: arrAnswer,
                countAnswer: keyId,
                addForm: configString[lang].manage.diagram,
                //required
                diagramId: req.params.id,
                setting: general.setting,
                button: general.button,
                elementDefault: configString[lang].element.general,
                general: configString[lang].general,
                achievementList: configString[lang].achievement,
                errorMsg: configString[lang].error,
                nextPage: '/lesson/variable/cereal',
                name:userInfo.nickname
            };
            res.render('manageDiagram/editDiagram', data);
        });
    }, 1000);

});

async function getScore() {
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

async function getSetting(lang = 'en') {
    // /System/Config/general/en
    let general = [];
    const refgeneral = firestore.collection('System').doc('Config')
        .collection('general').doc(lang)
    await refgeneral.get().then(doc => {
        if (!doc.exists) {
            general.push(false)
        } else {
            general.push(doc.data())
        }
    })
        .catch(err => {
            general.push(false)
        });
    return general[0]
}
module.exports = router;