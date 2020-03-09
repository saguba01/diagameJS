var firestore = require('../../configs/firebase-config').firestore; //test firebase

async function getFlowchart(id){
  console.log("getFlowchart")
  const refLogic = firestore.collection('Diagram').doc(id)
  await refLogic.get().then(async doc => {
    // console.log(doc.data())
    return ( doc.exists ? doc.data() : null )
  })
}

module.exports = {
  getNumOfUser: async function () {
    let responces = [];
    const refUserInfo = firestore.collection('UserInfo')
    await refUserInfo.get().then(snapshot => {
      snapshot.forEach(doc => {
        let resBack = doc.data()
        responces.push({
          id: doc.id,
          data: {
            avatar: resBack.avatar,
            nickname: resBack.nickname,
            playTutorial: resBack.playTutorial,
            score: resBack.score
          }
        })
      });

    })
      .catch(err => {
        responces.push(err.message)
      });
    return responces
  },
  getscroeHistory: async function () {
    let responces = [];
    const refScroeHistory = firestore.collection('ScoreHistory')
    await refScroeHistory.get().then(async (snapshot) => {
      await snapshot.forEach(async (doc) => {
        let result = doc.data()
        console.log(result.type)
        if (result.type == "logic") {
          const refLogic = firestore.collection('Logic').doc(result.questionId)
          await refLogic.get().then(async subDoc => {
            console.log(subDoc.data());
            await responces.push({
              id: result.questionId,
              type: (!doc.exists ? "not flound" : subDoc.data().Type),
              data: {
                date: result.date,
                questionId: result.questionId,
                round: result.round,
                score: result.score,
                time: result.time,
                type: result.type,
                uid: result.uid
              },
              ref: (!subDoc.exists ? null : subDoc.data())
            })
          }).catch(err => {
            console.warn("err")
            console.warn(err)
          });
        } else if("diagram"){
          const refLogic = firestore.collection('Diagram').doc(result.questionId)
          await refLogic.get().then(async doc => {
            responces.push({
              id: result.questionId,
              type: result.type,
              data: {
                date: result.date,
                questionId: result.questionId,
                round: result.round,
                time: result.time,
                type: result.type,
                uid: result.uid
              },
              ref: ( doc.exists ? doc.data() : null )
            })
          })
          
          
        }else{
          responces.push({
            id: result.questionId,
            type: result.type,
            data: {
              date: result.date,
              questionId: result.questionId,
              round: result.round,
              time: result.time,
              type: result.type,
              uid: result.uid
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