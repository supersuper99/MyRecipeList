import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import "firebase/compat/firestore";
import 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyA_QcSNRI_S-hXDOOpp_-C6Ascbr-6kA7c",
    authDomain: "myrecipelist-f6184.firebaseapp.com",
    projectId: "myrecipelist-f6184",
    storageBucket: "myrecipelist-f6184.appspot.com",
    messagingSenderId: "474965817230",
    appId: "1:474965817230:web:6f12cbed930c97f477d6df",
    measurementId: "G-9KD1R94KKB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  

  export default firebaseApp;