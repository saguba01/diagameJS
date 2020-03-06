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
    },
    getscroeHistory:async function(){
        let responces = [];
        const refScroeHistory = firestore.collection('ScoreHistory')
        
        await refScroeHistory.get().then(async (snapshot) => {
            await snapshot.forEach(async (doc) => {
                let result = doc.data()
                if(result.type == "logic"){
                    const refLogic= firestore.collection('Logic').doc(result.questionId)
                    await refLogic.get().then(async subDoc => {
                      await responces.push({
                            id : result.questionId,
                            type : (!doc.exists? "not flound" : subDoc.data().Type ),
                            data : {
                                date : result.date,
                                questionId : result.questionId,
                                round : result.round,
                                score : result.score,
                                time : result.time,
                                type :  result.type,
                                uid : result.uid
                            },
                            ref : subDoc.data()
                        })
                    }).catch(err => {
                      console.warn("err")
                      console.warn(err)
                    });
                }else{
                    responces.push({
                        id : result.questionId,
                        type : result.type,
                        data : {
                            date : result.date,
                            questionId : result.questionId,
                            round : result.round,
                            time : result.time,
                            type :  result.type,
                            uid : result.uid
                        }
                    })
                }
            });
          })
          .catch(err => {
            responces.push(err.message)
          });
          return responces
    }
}