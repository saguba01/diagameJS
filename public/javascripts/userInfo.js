var firestore = require('../../configs/firebase-config').firestore; //test firebase
const admin = require('../../configs/firebase-config').admin;
const auth = admin.auth();
/*
*Description: Update user by id
*@version 1.0
*@author Supachai Boonying
*@since 10 March 2020
*@required javascript , admin
*/
async function updateByUser(uid) {
    await auth.getUser(uid).then(async (user) => {
        const refUserInfo = firestore.collection('UserInfo').doc(uid)
        await refUserInfo.get().then((doc) => {
            let old = doc.data()
            old.displayName = user.displayName
            old.email = user.email
            refUserInfo.set(old)
        }).catch((err) => {
            console.warn(err.message)
        })
    })
}

/*
*Description: Create profile for new user
*@version 1.0
*@author Supachai Boonying
*@since 10 March 2020
*@required javascript, admin
*/
async function newUser(uid) {
    await auth.getUser(uid).then(async (user) => {
        const refUserInfo = firestore.collection('UserInfo').doc(uid)
        const newData = {
            avatar: 'robot-01.svg',
            displayName: user.displayName,
            email: user.email,
            nickname: '',
            playTutorial: true,
            role: 'user'
        }
        refUserInfo.set(newData)
    })
}
module.exports = {
    /*
    *Description: Retrieve all user data.
    *@version 1.0
    *@author Supachai Boonying
    *@since 10 March 2020
    *@required javascript, admin
    */
    userInfo: async function (id) {
        let user = null;
        const refUserInfo = firestore.collection('UserInfo').doc(id)
        await refUserInfo.get().then(doc => {
            if (!doc.exists) {
                user = {
                    status: "waring",
                    massage: "404"
                }
            } else {
                user = {
                    status: "success",
                    massage: "",
                    data: doc.data()
                }
            }
        })
            .catch(err => {
                user = {
                    status: "error",
                    massage: err
                }
            });
        return user
    },
    /*
    *Description: Through system introduction
    *@version 1.0
    *@author Supachai Boonying
    *@since 10 March 2020
    *@required javascript, admin
    */
    passTutorail: async function (uid, newData) {
        let refUserInfo = firestore.collection("UserInfo").doc(uid)
        refUserInfo.set(newData).then(() => {
            return {
                status: "success"
            }
        }).catch((e) => {
            return {
                status: "error",
                massage: e
            }
        })
    },
    /*
    *Description: Retrieve all user data.
    *@version 1.0
    *@author Supachai Boonying
    *@since 10 March 2020
    *@required javascript, admin
    */
    allUser: async function (callback) {
        await auth.listUsers().then(async (userRecords) => {
            let listuser = []
            await userRecords.users.forEach((user) => {
                listuser.push(user)
            });
            callback(listuser)
        }).catch((error) => {
            callback(error)
        });
    },
    /*
    *Description: Update profile all user
    *@version 1.0
    *@author Supachai Boonying
    *@since 10 March 2020
    *@required javascript, admin
    */
    updateUser: async function (callback) {
        await auth.listUsers().then(async (userRecords) => {
            await userRecords.users.forEach(async (user) => {
                let refUserInfo = firestore.collection('UserInfo').doc(user.uid)
                console.log(user.uid)
                try {
                    await refUserInfo.get().then(doc => {
                        if (doc.exists) {
                            console.log(doc.data())
                            let oldData = doc.data()
                            let newData = {
                                avatar: oldData.avatar,
                                nickname: (oldData.nickname == "" ? user.displayName : oldData.nickname),
                                playTutorial: (oldData.playTutorial == undefined ? true : oldData.playTutorial),
                                role: oldData.role,
                                email: user.email,
                                displayName: user.displayName,
                            }
                            refUserInfo.set(newData)
                        } else {
                            let newData = {
                                avatar: 'robot-01.svg',
                                nickname: user.displayName,
                                playTutorial: true,
                                role: 'user',
                                email: user.email,
                                displayName: user.displayName,
                            }
                            refUserInfo.set(newData)
                        }
                    })
                } catch (e) {
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
    /*
    *Description: Update user by id
    *@version 1.0
    *@author Supachai Boonying
    *@since 10 March 2020
    *@required javascript, admin
    */
    updateByUser: uid => updateByUser(uid),
    /*
    *Description: check profile of user.
    *@version 1.0
    *@author Supachai Boonying
    *@since 10 March 2020
    *@required javascript, admin
    */
    checkUser: async (uid) => {
        const refUserInfo = firestore.collection('UserInfo').doc(uid)
        await refUserInfo.get().then(doc => {
            if (doc.exists) {
                updateByUser(uid)
            } else {
                newUser(uid)
            }
        }).catch((error) => {
            callback("error" + error.message)
        });
    },

    changeUser: async function () {
        await auth.listUsers().then(async (userRecords) => {
            await userRecords.users.forEach(async (user) => {
                let refUserInfo = firestore.collection('UserInfo').doc(user.uid)
                try {
                    await refUserInfo.get().then(doc => {
                        if (doc.exists) {
                            console.log(doc.data())
                            let oldData = doc.data()
                            let newData = {
                                avatar: oldData.avatar,
                                nickname: (oldData.nickname == "" ? user.displayName : oldData.nickname),
                                playTutorial: (oldData.playTutorial == undefined ? true : oldData.playTutorial),
                                role: oldData.role,
                                email: user.email,
                                displayName: user.displayName,
                            }
                            refUserInfo.set(newData)
                        } else {
                            let newData = {
                                avatar: 'robot-01.svg',
                                nickname: user.displayName,
                                playTutorial: true,
                                role: 'user',
                                email: user.email,
                                displayName: user.displayName,
                            }
                            refUserInfo.set(newData)
                        }
                    })
                } catch (e) {
                    console.warn(user.uid)
                    console.warn(e)
                }

            });
        }).catch((error) => {
            console.warn(error.message)
        });
    },
}