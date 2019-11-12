// Initialize Firebase
// TODO: Replace with your project's customized code snippet

var config = {
    apiKey: "AIzaSyDNdwwlyMxUjXijWdKh_lXQCYqp053gP0E",
    authDomain: "diagamejs.firebaseapp.com",
    databaseURL: "https://diagamejs.firebaseio.com",
    projectId: "diagamejs",
    storageBucket: "diagamejs.appspot.com",
    messagingSenderId: "613912864191",
    appId: "1:613912864191:web:3a88ce33f2a5ae71b92d0a",
    measurementId: "G-1GPB97V823"
  };

firebase.initializeApp(config);
firebase.analytics();

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