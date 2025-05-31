require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || "dev01-school-db-firebase",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY 
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
      : undefined,
    databaseURL: "https://dev01-school-db-firebase-default-rtdb.europe-west1.firebasedatabase.app"
  },
  collection: {
    animals: 'animals'
  }
};