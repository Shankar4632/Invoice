// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjbPRYFNs2MQb6I3DB8y0BGQjq9a390QU",
  authDomain: "invoice-53093.firebaseapp.com",
  projectId: "invoice-53093",
  storageBucket: "invoice-53093.appspot.com",
  messagingSenderId: "625675621509",
  appId: "1:625675621509:web:3c32ce28c2f09f233f05ec",
  measurementId: "G-VZZ6VW35PH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
