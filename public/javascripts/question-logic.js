var firestore = require('../../configs/firebase-config').firestore; //test firebase
var sortId = require('./sortId')
module.exports = {
  getAllLogic: async function(lang ="en")
    {
        let responces = [];
        const flowchart = firestore.collection('Logic')
        await flowchart.get().then(snapshot => {
          snapshot.forEach(doc => {
            let resBack = doc.data()
            responces.push({
              id : doc.id,
              data : {
                Name : (lang == "en"? resBack.NameEN : resBack.NameTH ),
                Level : resBack.Level,
                Answer : resBack.Answer,
                Question : resBack.Question,
                Type : resBack.Type
              }
            })
          });
      
        })
        .catch(err => {
          responces.push(err.message)
        });
        return responces.sort(sortId.compareValues('id'))
    } 
}