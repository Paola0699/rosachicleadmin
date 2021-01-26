import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import 'firebase/firebase-storage'
// Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyD1R7Ib7XREz0TNT4vBKmfJ6PNBvwqRfT4",
    authDomain: "themixerud-2020.firebaseapp.com",
    projectId: "themixerud-2020",
    storageBucket: "themixerud-2020.appspot.com",
    messagingSenderId: "380813747913",
    appId: "1:380813747913:web:ea83bce126df189bea0f18",
    measurementId: "G-0JNT64DXD7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase