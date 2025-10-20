// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-bf279.firebaseapp.com",
  projectId: "mern-estate-bf279",
  storageBucket: "mern-estate-bf279.firebasestorage.app",
  messagingSenderId: "734196349265",
  appId: "1:734196349265:web:b5ea7230d76aa3bd7a3b70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);