var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var configString = require('../app').configString;
var firestore = require('../configs/firebase-config').firestore;
var setting = require('../public/javascripts/setting');
/*
 *Description: open diagram question.
 *@version 2.0
 *@author Thongthorn Karapakdee
 *@since 6 December 2019
 *@required node.js,ExpressJS.
 */
router.get('/add', authen, async function (req, res, next) {
    let lang = req.cookies.lang;
    const general = await setting.getSetting(lang)
    let lesson = configString[lang].lesson.variable;
    var data = {
        layout: 'default',
        navBar: true,
        user: req.session.user,
        //lesson: lesson,
        //subLesson: lesson.subLesson.juice,
        //element: configString[lang].element.variable.juice,
        intro: configString[lang].intro,
        recipe: configString[lang].recipe.variable.juice,
        //required
        setting: general.setting,
        button: general.button,
        elementDefault: configString[lang].element.general,
        general: configString[lang].general,
        achievementList: configString[lang].achievement,
        errorMsg: configString[lang].error,
        nextPage: '/lesson/variable/cereal'
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
    const general = await setting.getSetting(lang)
    let lesson = configString[lang].lesson.variable;
    let refQuestion = firestore.collection("Diagram");
    refQuestion.doc(req.params.id).get().then(function (doc) {
        var data = {
            layout: 'default',
            navBar: true,
            user: req.session.user,
            //lesson: lesson,
            //subLesson: lesson.subLesson.juice,
            //element: configString[lang].element.variable.juice,
            intro: configString[lang].intro,
            recipe: configString[lang].recipe.variable.juice,
            HintEn: doc.data().HintEng,
            HintTh: doc.data().HintTh,
            NameEn: doc.data().NameEng,
            NameTh: doc.data().NameTh,
            level: doc.data().Level,
            //required
            setting: general.setting,
            button: general.button,
            elementDefault: configString[lang].element.general,
            general: configString[lang].general,
            achievementList: configString[lang].achievement,
            errorMsg: configString[lang].error,
            nextPage: '/lesson/variable/cereal'
        };
        res.render('manageDiagram/editDiagram', data);
    });
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