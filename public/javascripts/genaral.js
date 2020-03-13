var firestore = require('../../configs/firebase-config').firestore; //test firebase

module.exports = {
/*
*Description: Retrieve string ganeral
*@version 1.0
*@author Supachai Boonying
*@since 10 March 2020
*@required javascript, firestore
*/
    getGanaral: async function(lang='en')
    {
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