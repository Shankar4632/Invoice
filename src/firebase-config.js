// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1J6ugDno5XVAj8MAWnHCT860Vwrn3JkE",
  authDomain: "invoice-nxs.firebaseapp.com",
  projectId: "invoice-nxs",
  storageBucket: "invoice-nxs.appspot.com",
  messagingSenderId: "603350346210",
  appId: "1:603350346210:web:dfdfa79a0d7482d6b8b1bb",
  measurementId: "G-N519KSBMVB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
