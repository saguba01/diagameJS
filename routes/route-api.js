var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var leaderboard = require('../public/javascripts/leaderboard');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
*Description: Service Api GetallScore For Leaderboard
*@version 1.0
*@author Jirapat Lapudomsakda
*@since 1 March 2020
*@required javascript, materialize-css.
*/

router.get('/getAllScore', async (req,res,next) =>{
    const allscore = await leaderboard.getLeaderboard();
    const alluserinfo = await leaderboard.getUserInfo();
    var scorearr = [];
    var userinfo = [];
    var arr = [];

    alluserinfo.forEach((value) => {
      userinfo.push(value)
    });

    allscore.forEach((value) => {
      scorearr.push(value)
    });


    res.send({
      user:userinfo,
      score:scorearr
    });
});

module.exports = router;
