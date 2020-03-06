var express = require('express');
var router = express.Router();
var authen = require('../utils/authen');
var leaderboard = require('../public/javascripts/leaderboard');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAllScore',authen, async (req,res,next) =>{
    const allscore = await leaderboard.getLeaderboard();
    const alluserinfo = await leaderboard.getUserInfo();
    var arr = [];

    allscore.forEach((element) =>{
      alluserinfo.forEach((value) =>{
        if(element.uid == value.id){
          arr.push({
            date:element.date,
            qid:element.questionId,
            round:element.round,
            score:element.score,
            time:element.time,
            type:element.type,
            nickname:value.data.nickname,
            avatar:value.data.avatar
          })
        }
      })
    });
    
    res.send(arr);
});

module.exports = router;
