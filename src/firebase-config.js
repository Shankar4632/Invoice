// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByPj1GuPj7S9Be05ZD9xHq214MQJVXlVA",
  authDomain: "invoice-cebec.firebaseapp.com",
  projectId: "invoice-cebec",
  storageBucket: "invoice-cebec.appspot.com",
  messagingSenderId: "595672482838",
  appId: "1:595672482838:web:77d1569d7602d3a6d26137",
  measurementId: "G-L0Z15CH9HV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
