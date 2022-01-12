
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Config = {
    apiKey: "AIzaSyBfFYYfwodxSq7tdcDJxVjfG2_3MgWylfM",
    authDomain: "myeshop-9bce2.firebaseapp.com",
    projectId: "myeshop-9bce2",
    storageBucket: "myeshop-9bce2.appspot.com",
    messagingSenderId: "41905673153",
    appId: "1:41905673153:web:06a4e75dc07da1907f9540",
    measurementId: "G-YG2956HQEX"
  };
  // Initialize Firebase
firebase.initializeApp(Config);
// const analytics = getAnalytics(app);

export default firebase
