// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa5VV08Mx1I3C8yiuMBdQS1gkAefxYmhI",
  authDomain: "newinvoice-690af.firebaseapp.com",
  projectId: "newinvoice-690af",
  storageBucket: "newinvoice-690af.appspot.com",
  messagingSenderId: "360843298665",
  appId: "1:360843298665:web:bcecad56da8094033edff8",
  measurementId: "G-4ZC0HD2YFS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
