var firestore = require('../../configs/firebase-config').firestore; 

module.exports = {
    getLeaderboard: async function()
    {
         // /System/Config/general/en
         let leaderboard = [];
         const refleaderboard = firestore.collection('ScoreHistory')
         refleaderboard.get().then(doc => {
             doc.forEach( element => {
               leaderboard.push(element.data());
             });
         })
         .catch(err => {
           leaderboard.push(false)
         });
         return leaderboard;
    } 
}