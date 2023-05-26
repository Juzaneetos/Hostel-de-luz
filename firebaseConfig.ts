// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPlxzBOTqDA1n9HyIbNnN0gkAgw33sh4I",
  authDomain: "hosteldeluz-426b8.firebaseapp.com",
  projectId: "hosteldeluz-426b8",
  storageBucket: "hosteldeluz-426b8.appspot.com",
  messagingSenderId: "584905925653",
  appId: "1:584905925653:web:492b1d23786cdb7bb0da1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();