// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4AMiuwwLy5SsxkXo8g9NGxbkkVbtRawM",
  authDomain: "travel-a462d.firebaseapp.com",
  projectId: "travel-a462d",
  storageBucket: "travel-a462d.appspot.com",
  messagingSenderId: "469826117687",
  appId: "1:469826117687:web:d049d1b9a6a72f27871fb2",
  measurementId: "G-3TTYKEM74G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
