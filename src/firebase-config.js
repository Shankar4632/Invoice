import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyB2_R7XTqhj1b65DtKg_qJYSUZe5-ip2lQ",
  authDomain: "reactinvoice-67fc4.firebaseapp.com",
  projectId: "reactinvoice-67fc4",
  storageBucket: "reactinvoice-67fc4.appspot.com",
  messagingSenderId: "156179556081",
  appId: "1:156179556081:web:7732f43d3e72ca54a0eb50",
  URL: "https://reactinvoice-67fc4-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
export const dataRef = firebase.database();
export default firebase;
