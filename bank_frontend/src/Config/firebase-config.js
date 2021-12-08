import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNVrNdcK-OorQg93FSkS3lbdeorylnwbs",
  authDomain: "my-bank-app-fb130.firebaseapp.com",
  projectId: "my-bank-app-fb130",
  storageBucket: "my-bank-app-fb130.appspot.com",
  messagingSenderId: "609118594886",
  appId: "1:609118594886:web:602763911ca5742f722747"
};

firebase.initializeApp(firebaseConfig);

export default firebase