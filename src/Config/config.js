
import firebase from "firebase/app";
import "firebase/database";
// import "firebase/firestore";

const config = {
    apiKey: "AIzaSyA7sZwr5Gz2KHVn_rPSYborOC56ctaIX4o",
    authDomain: "test-1612346463365.firebaseapp.com",
    databaseURL: "https://test-1612346463365-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-1612346463365",
    storageBucket: "test-1612346463365.appspot.com",
    messagingSenderId: "275152113326",
    appId: "1:275152113326:web:4f8925954f7067e908673f"
  };
// const config = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// }

// export default config;
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

