// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtvBQxRcBljCmm2JqsG6XUOrsBXGaDjSs",
  authDomain: "journal-app-56db3.firebaseapp.com",
  projectId: "journal-app-56db3",
  storageBucket: "journal-app-56db3.firebasestorage.app",
  messagingSenderId: "69793037993",
  appId: "1:69793037993:web:cdd8fce3214e03b97533b8",
  measurementId: "G-3YTKBR1C3N"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//Para la authentication
export const FirebaseAuth=getAuth(FirebaseApp);
//Para usar base de datos de could fire store
export const FirebaseDB=getFirestore(FirebaseApp);

