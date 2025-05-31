const admin = require('firebase-admin');
const config = require('./index');

let firebaseApp;

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (!firebaseApp) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebase.projectId,
        clientEmail: config.firebase.clientEmail,
        privateKey: config.firebase.privateKey
      }),
      databaseURL: config.firebase.databaseURL,
      storageBucket: config.firebase.storageBucket
    });
    
    console.log('Firebase Admin SDK initialized');
  }
  
  return firebaseApp;
};

// Get Firestore database instance
const getDb = () => {
  const app = initializeFirebase();
  return app.firestore();
};

module.exports = {
  getDb,
  initializeFirebase
};