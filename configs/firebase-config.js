var admin = require("firebase-admin");
var serviceAccount = require("./diagame-firebase-adminsdk.json");
var firebase = require("firebase");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.admin = admin;

var firestore = admin.firestore();
exports.firestore = firestore;