import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAEbErWv4ugCib06Di79EO5gA9Fevr1WHg",
  authDomain: "mendit-be930.firebaseapp.com",
  databaseURL: "https://mendit-be930-default-rtdb.firebaseio.com",
  projectId: "mendit-be930",
  storageBucket: "mendit-be930.appspot.com",
  messagingSenderId: "241761803320",
  appId: "1:241761803320:web:4e92e4d9ae093ff7559acd",
  measurementId: "G-E3CVK0MHQY",
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { app, db, auth, firebase };
