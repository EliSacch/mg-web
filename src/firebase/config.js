import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgoYcRaHCM_WOQCLQmG56MU4EZBsxWl7A",
    authDomain: "mg-manager.firebaseapp.com",
    projectId: "mg-manager",
    storageBucket: "mg-manager.appspot.com",
    messagingSenderId: "1082441132221",
    appId: "1:1082441132221:web:d804022a485a7783e72fd4",
    measurementId: "G-B6JHFMC63V"
  };

  // Init firebase
  firebase.initializeApp(firebaseConfig);

  // Init services
  const db = firebase.firestore()

  export { db }