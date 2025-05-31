const admin = require('firebase-admin');
const config = require('./index');

let firebaseApp;

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (!firebaseApp) {
    // For local development using service account credentials
    if (config.firebase.privateKey) {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.firebase.projectId,
          clientEmail: config.firebase.clientEmail,
          privateKey: config.firebase.privateKey
        }),
        databaseURL: "https://dev01-school-db-firebase-default-rtdb.europe-west1.firebasedatabase.app"
      });
    } else {
      // For production deployment (uses environment credentials)
      firebaseApp = admin.initializeApp({
        projectId: "dev01-school-db-firebase",
        storageBucket: "dev01-school-db-firebase.firebasestorage.app",
        databaseURL: "https://dev01-school-db-firebase-default-rtdb.europe-west1.firebasedatabase.app"
      });
    }
    
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