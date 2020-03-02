var firestore = require('../../configs/firebase-config').firestore; //test firebase
var sortId = require('./sortId')
module.exports = {
  getAllLogic: async function(lang ="en")
    {
        let responces = [];
        const flowchart = firestore.collection('Logic')
        await flowchart.get().then(snapshot => {
          snapshot.forEach(doc => {
            responces.push({id:doc.id,data:doc.data() })
            // responces.push()
            // console.log(doc.id, '=>', doc.data());
          });
      
        })
        .catch(err => {
          responces.push(err.message)
        });
        return responces.sort(sortId.compareValues('id'))
    } 
}