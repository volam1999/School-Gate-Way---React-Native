import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC95awm69o7l8vV3qZsSPRuYUSAjXz_O_A",
  authDomain: "itqnu-d677e.firebaseapp.com",
  databaseURL: "https://itqnu-d677e.firebaseio.com",
  projectId: "itqnu-d677e",
  storageBucket: "itqnu-d677e.appspot.com",
  messagingSenderId: "990043757857",
  appId: "1:990043757857:web:44e4f8d94e30e49d533260",
  measurementId: "G-XFHVTQNHYC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
