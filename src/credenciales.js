// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQqN3M9JnzTXzON_itPjnM-CE-DEOqR8k",
  authDomain: "hogsmeade-87b4c.firebaseapp.com",
  projectId: "hogsmeade-87b4c",
  storageBucket: "hogsmeade-87b4c.appspot.com",
  messagingSenderId: "755313077440",
  appId: "1:755313077440:web:e97c72ede7d711c99b9125"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);


export default appFirebase