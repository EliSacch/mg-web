import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "mg-manager.firebaseapp.com",
    projectId: "mg-manager",
    storageBucket: "mg-manager.appspot.com",
    messagingSenderId: "1082441132221",
    appId: "1:1082441132221:web:d804022a485a7783e72fd4",
    measurementId: "G-B6JHFMC63V"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth }
