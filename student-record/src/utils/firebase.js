import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDPiVOALYiGL7qROulkQgpk3BEgIw5iWIQ",
    authDomain: "studentrecord-e9f5d.firebaseapp.com",
    databaseURL: "https://studentrecord-e9f5d-default-rtdb.firebaseio.com",
    projectId: "studentrecord-e9f5d",
    storageBucket: "studentrecord-e9f5d.appspot.com",
    messagingSenderId: "99707637732",
    appId: "1:99707637732:web:d682577ee0cbca1f3a01f1",
    measurementId: "G-616H6DFDSJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;