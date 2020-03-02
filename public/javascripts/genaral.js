var firestore = require('../../configs/firebase-config').firestore; //test firebase

module.exports = {
    getGanaral: async function(lang='en')
    {
         // /System/Config/general/en
         let general = [];
         const refgeneral = firestore.collection('System').doc('Config')
                             .collection('general').doc(lang)
         await refgeneral.get().then(doc => {
           if (!doc.exists) {
             general.push(false)
           } else {
             general.push(doc.data())
           }
         })
         .catch(err => {
           general.push(false)
         });
         return general[0]
    } 
}