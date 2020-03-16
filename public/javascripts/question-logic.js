var firestore = require('../../configs/firebase-config').firestore; //test firebase
var sortId = require('./sortId')
module.exports = {
/*
*Description: Retrieve all logic
*@version 1.0
*@author Supachai Boonying
*@since 10 March 2020
*@required javascript, firestore
*/
  getAllLogic: async function(lang ="en",sortByKey="id")
    {
      console.log(`sortByKey : ${sortByKey}`)
        let responces = [];
        const flowchart = firestore.collection('Logic')
        await flowchart.get().then(snapshot => {
          snapshot.forEach(doc => {
            let resBack = doc.data()
            responces.push({
              id : doc.id,
              type : resBack.Type,
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
        return responces.sort(sortId.compareValues(sortByKey))
    } 
}