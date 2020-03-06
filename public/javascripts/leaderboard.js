var firestore = require('../../configs/firebase-config').firestore;

module.exports = {
  getLeaderboard: async function () 
  {
    let leaderboard = [];
    const refleaderboard = firestore.collection('ScoreHistory')
    await refleaderboard.get().then(doc => {
      doc.forEach(element => {
        leaderboard.push(element.data());
      });
    })
      .catch(err => {
        leaderboard.push(false)
      });
    return leaderboard;
  }
  ,getUserInfo: async function () 
  {
      let userinfo = [];
      const refuserinfo = firestore.collection('UserInfo')
      await refuserinfo.get().then(doc => {
        doc.forEach(element => {
          userinfo.push({
            id:element.id,
            data:element.data(),
          });
        });
      })
        .catch(err => {
          userinfo.push(false);
        });
      return userinfo;
  }
}