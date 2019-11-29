/*  
    File: route-report            
    Create date : 28-11-2018
    Descriptrion : 
*/
const express = require('express');
const router = express.Router();
const authen = require('../utils/authen');
const configString = require('../app').configString;
const firestore = require('../configs/firebase-config').firestore;

router.get('/', authen, (req, res, next) => {
    let lang = req.cookies.lang;
    let data = {
        layout: 'default',
        user: req.session.user,
        element: configString[lang].element.general,
        intro: configString[lang].intro,
        //required
        navBar: true
    };
    res.render('report/index', data);
})


module.exports = router;