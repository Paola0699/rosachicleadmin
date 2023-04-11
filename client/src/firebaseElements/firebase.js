import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import 'firebase/firebase-storage'
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDTeKAvn3VLNnB1_YI0mlUd6HLUYV3kaAI",
    authDomain: "rosachicle-4aac7.firebaseapp.com",
    projectId: "rosachicle-4aac7",
    storageBucket: "rosachicle-4aac7.appspot.com",
    messagingSenderId: "850851860540",
    appId: "1:850851860540:web:2fcf27c6baf17a52cf3339"
  };
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase