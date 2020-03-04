var firestore = require('../../configs/firebase-config').firestore; //test firebase

module.exports = {
    userInfo: async function(id)
    {
         let user = null;
         const refUserInfo = firestore.collection('UserInfo').doc(id)
         await refUserInfo.get().then(doc => {
           if (!doc.exists) {
            user = { 
                status : "waring" , 
                massage : "not have data"
            }
           } else {
            user ={ 
                status : "sucess" , 
                massage : "",
                data : doc.data() 
            }
           }
         })
         .catch(err => {
            user={ 
                status : "error" , 
                massage : err
            }
         });
         return user
    },
    passTutorail: async function(uid,newData){
        let refUserInfo = firestore.collection("UserInfo").doc(uid) 
        refUserInfo.set(newData).then(()=>{
          return {
            status : "success"
          }
        }).catch((e)=>{
            return {
                status : "error",
                massage : e
            }
        })
    }
}