var firestore = require('../../configs/firebase-config').firestore; //test firebase
const admin = require('../../configs/firebase-config').admin;
const auth = admin.auth();

async function updateByUser(uid){
    await auth.getUser(uid).then(async (user)=>{
        const refUserInfo = firestore.collection('UserInfo').doc(uid)
        await refUserInfo.get().then((doc)=>{
            let old = doc.data()
            old.displayName = user.displayName
            old.email = user.email
            old.photoURL = (user.photoURL == undefined ? null : user.photoURL)
            refUserInfo.set(old)
        }).catch((err)=>{
            console.warn(err.message)
        })
    })
}

async function newUser(uid){
    await auth.getUser(uid).then(async (user)=>{
        const refUserInfo = firestore.collection('UserInfo').doc(uid)
        const newData = {
            avatar : 'robot-01.svg',
            displayName : user.displayName,
            email : user.email,
            nickname : '',
            photoURL : (user.photoURL == undefined ? null : user.photoURL),
            playTutorial : true ,
            role : 'user'
        }
        refUserInfo.set(newData)
    })
} 
module.exports = {
    userInfo: async function(id)
    {
         let user = null;
         const refUserInfo = firestore.collection('UserInfo').doc(id)
         await refUserInfo.get().then(doc => {
           if (!doc.exists) {
            user = { 
                status : "waring" , 
                massage : "404"
            }
           } else {
            user ={ 
                status : "success" , 
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
    },
    allUser : async function(callback){
        await auth.listUsers().then( async (userRecords) => {
            let listuser = []
            await userRecords.users.forEach((user) => {
                listuser.push(user)
            });
            callback(listuser)
        }).catch((error) => {
            callback(error)
        });
    },

    updateUser : async function(callback){
        await auth.listUsers().then( async (userRecords) => {
            await userRecords.users.forEach( async (user) => {
                let refUserInfo = firestore.collection('UserInfo').doc(user.uid)
                console.log(user.uid)
                try{
                    await refUserInfo.get().then(doc => {
                        if(doc.exists){
                            console.log(doc.data())
                            let oldData = doc.data()
                            let newData = {
                                avatar : oldData.avatar,
                                nickname : (oldData.nickname == "" ? user.displayName : oldData.nickname ),
                                playTutorial : (oldData.playTutorial == undefined ? true : oldData.playTutorial),
                                role : oldData.role,
                                email : user.email,
                                displayName : user.displayName,
                                photoURL : (user.photoURL == null ? null :user.photoURL )
                            }
                            refUserInfo.set(newData)
                        }else{
                            let newData = {
                                avatar : 'robot-01.svg',
                                nickname : user.displayName,
                                playTutorial : true,
                                role : 'user',
                                email : user.email,
                                displayName : user.displayName,
                                photoURL : (user.photoURL == null ? null :user.photoURL )
                            }
                            refUserInfo.set(newData)
                        }
                    })
                }catch(e){
                    console.warn(user.uid)
                    console.warn(e)
                }
                
            });
            callback("success")
        }).catch((error) => {
            console.warn('error')
            console.warn('error.message')
        });
    },
    updateByUser: uid => updateByUser(uid),

    checkUser: async (uid)=>{
        const refUserInfo = firestore.collection('UserInfo').doc(uid)
        await refUserInfo.get().then(doc => {
            if(doc.exists){
                updateByUser(uid) 
            }else{
                newUser(uid) 
            }
        }).catch((error) => {
            callback("error" + error.message)
        });
    }
}