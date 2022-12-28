// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmJC6NyOfXthfoSRZz1hrJOAU8FdVvcXQ",
  authDomain: "manage-your-task.firebaseapp.com",
  projectId: "manage-your-task",
  storageBucket: "manage-your-task.appspot.com",
  messagingSenderId: "601408261728",
  appId: "1:601408261728:web:5007c989969c1bdedcbd05"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);