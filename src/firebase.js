// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ3xum0gtiHh1cv7WJCZIb1TIzJUZEi8o",
  authDomain: "todo-app-2-37733.firebaseapp.com",
  projectId: "todo-app-2-37733",
  storageBucket: "todo-app-2-37733.appspot.com",
  messagingSenderId: "675787134782",
  appId: "1:675787134782:web:17327cd624d6a7ee3cfe6f",
  measurementId: "G-BLYDRKWGXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default getFirestore();