const admin = require('firebase-admin');
const config = require('./index');

let firebaseApp;

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (!firebaseApp) {
    // Format the private key by replacing escaped newlines with actual newlines
    const formattedPrivateKey = config.firebase.privateKey.replace(/\\n/g, '\n');
    
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebase.projectId,
        clientEmail: config.firebase.clientEmail,
        privateKey: formattedPrivateKey
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