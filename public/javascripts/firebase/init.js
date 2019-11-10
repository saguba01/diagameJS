// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyAyMmQVNDsfvYafZETrM68Po55qWHZ8ZH8",
    authDomain: "diagame.firebaseapp.com",
    databaseURL: "https://diagame.firebaseio.com",
    projectId: "diagame",
    storageBucket: "diagame.appspot.com",
    messagingSenderId: "872023570847"
};
firebase.initializeApp(config);

let firestore = firebase.firestore();
var faceookProvider = new firebase.auth.FacebookAuthProvider();
var googleProvider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function (user) { 
    if(user){
        // console.log(user.credential);
        window.localStorage.setItem('uid', user.uid);
        window.localStorage.setItem('displayName', user.displayName);
        // console.log('firebase-config', user.uid);
    }else{
        window.localStorage.clear();
    }
});