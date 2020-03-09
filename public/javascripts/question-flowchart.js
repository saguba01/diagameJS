var firestore = require('../../configs/firebase-config').firestore; //test firebase

module.exports = {
  getAllFlowchart: async function(lang ="en")
    {
        let responces = [];
        const flowchart = firestore.collection('Diagram')
        await flowchart.get().then(snapshot => {
            snapshot.forEach(doc => {
                const result = doc.data()
                responces.push({id:doc.id,
                    data: {
                        hint : (lang == "en" ? result.HintEN :result.HintTH ),
                        name : (lang == "en" ? result.NameEN :result.NameTH ),
                        level : result.Level
                    }
                })
            // console.log(doc.id, '=>', doc.data());
            });
            
        })
        .catch(err => {
            responces.push(err.message)
        });
        return responces
    } 
//     let citiesRef = db.collection('cities');
// let allCities = citiesRef.get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch(err => {
//     console.log('Error getting documents', err);
//   });
}