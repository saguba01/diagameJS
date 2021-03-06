var firestore = require('../../configs/firebase-config').firestore; //test firebase

/*
*Description: Retrieve all flowchart
*@version 1.0
*@author Supachai Boonying
*@since 10 March 2020
*@required javascript, firestore
*/
async function getFlowchart(id) {
  const refLogic = firestore.collection('Diagram').doc(id)
  await refLogic.get().then(async doc => {
    return (doc.exists ? doc.data() : null)
  })
}

module.exports = {
  /*
  *Description: Retrieve all players
  *@version 1.0
  *@author Supachai Boonying
  *@since 10 March 2020
  *@required javascript, firestore
  */
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
            score: resBack.score,
            role: (resBack.role == undefined || resBack.role == null ? 'user' : resBack.role)
          }
        })
      });

    })
      .catch(err => {
        responces.push(err.message)
      });
    return responces
  },
  /*
  *Description: Retrieves all playback data. It is divided into the following topics: flowchart operators and logic.
  *@version 1.0
  *@author Supachai Boonying
  *@since 10 March 2020
  *@required javascript, firestore
  */
  getscroeHistory: async function () {
    let responces = [];
    const refScroeHistory = firestore.collection('ScoreHistory')
    await refScroeHistory.get().then(async (snapshot) => {
      await snapshot.forEach(async (doc) => {
        let result = doc.data()
        if (result.type == "logic" || result.type == "operator") {
          const refLogic = firestore.collection('Logic').doc(result.questionId)
          await refLogic.get().then(async subDoc => {
            try {
              if (subDoc.exists) {
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
              }
            } catch (e) {
              console.warn("sub err")
              console.warn(e)
            }

          }).catch(err => {
            console.warn("err")
            console.warn(err)
          });
        } else if ( result.type == "diagram") {
          const refLogic = firestore.collection('Diagram').doc(result.questionId)
          await refLogic.get().then(async doc => {
            if (doc.exists) {
              responces.push({
                id: result.questionId,
                type: result.type,
                data: {
                  date: result.date,
                  questionId: result.questionId,
                  round: result.round,
                  time: result.time,
                  type: result.type,
                  uid: result.uid,
                  score: result.score,
                },
                ref: (doc.exists ? doc.data() : null)
              })
            }
          })
        } else {
          responces.push({
            id: result.questionId,
            type: result.type,
            data: {
              date: result.date,
              questionId: result.questionId,
              round: result.round,
              time: result.time,
              type: result.type,
              score: result.score,
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