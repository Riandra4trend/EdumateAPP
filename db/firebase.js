// db/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTn_7lH0JJ-Vz-gv4hPiVqpC_ncmCiyEU",
  authDomain: "edumateapp-90121.firebaseapp.com",
  projectId: "edumateapp-90121",
  storageBucket: "edumateapp-90121.appspot.com",
  messagingSenderId: "940994544821",
  appId: "1:940994544821:web:7982841eab2b78ef6faafc",
  measurementId: "G-VTFQN8QS49"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };