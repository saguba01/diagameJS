var firestore = require('../../configs/firebase-config').firestore; //test firebase

module.exports = {
/*
*Description: Retrieve information for assigning questions
*@version 1.0
*@author Supachai Boonying
*@since 10 March 2020
*@required javascript, firestore
*/
    getScore: async function () {
        let score = null;
        const refScore = firestore.collection('System').doc('Score')
        await refScore.get().then(doc => {
            if (!doc.exists) {
                score = {
                    status: "waring",
                    massage: "not have data"
                }
            } else {
                score = {
                    status: "sucess",
                    data: doc.data()
                }
            }
        })
            .catch(err => {
                scorescore = {
                    status: "error",
                    massage: err,
                    data: null
                }
            });
        return score
    }
}