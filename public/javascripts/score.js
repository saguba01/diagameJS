var firestore = require('../../configs/firebase-config').firestore; //test firebase

module.exports = {
    getScore: async function()
    {
         let score = null;
         const refScore = firestore.collection('System').doc('Score')
         await refScore.get().then(doc => {
           if (!doc.exists) {
            score = { 
                status : "waring" , 
                massage : "not have data"
            }
           } else {
            score ={ 
                status : "sucess" , 
                massage : "",
                data : doc.data() 
            }
           }
         })
         .catch(err => {
            score.push(false)
         });
         return score
    } 
}