
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebase from 'firebase/app';
//import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage


const firebaseConfig = {
  apiKey: "AIzaSyDncL-zRq5RaEmAGW6GFJPrqCLP8fg1X1c",
  authDomain: "bigmart-2ef58.firebaseapp.com",
  databaseURL: "https://bigmart-2ef58.firebaseio.com",
  projectId: "bigmart-2ef58",
  storageBucket: "bigmart-2ef58.appspot.com",
  messagingSenderId: "33984927425",
  appId: "1:33984927425:web:0256701f37c07c3c65e640",
  measurementId: "G-NDMTF0Y3RP"
};

//firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

 const firestore=firebaseApp.firestore();
 export const storageRef = firebaseApp.storage().ref();
// const provider = new firebase.auth.GoogleAuthProvider();


export default firestore;

