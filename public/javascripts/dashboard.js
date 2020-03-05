var firestore = require('../../configs/firebase-config').firestore; //test firebase

module.exports = {
    getNumOfUser: async function()
    {
        let responces = [];
        const refUserInfo = firestore.collection('UserInfo')
        await refUserInfo.get().then(snapshot => {
          snapshot.forEach(doc => {
            let resBack = doc.data()
            responces.push({
              id : doc.id,
              data : {
                avatar : resBack.avatar,
                nickname : resBack.nickname,
                playTutorial : resBack.playTutorial,
                score : resBack.score
              }
            })
          });
      
        })
        .catch(err => {
          responces.push(err.message)
        });
        return responces
    } 
}