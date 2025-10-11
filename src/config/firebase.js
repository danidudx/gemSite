// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrBB5Y1D5KF0C3KykYXIT5XMciOgeZ3hw",

  authDomain: "gemandjwell-221e9.firebaseapp.com",

  projectId: "gemandjwell-221e9",

  storageBucket: "gemandjwell-221e9.firebasestorage.app",

  messagingSenderId: "444925644606",

  appId: "1:444925644606:web:d0a3e4cf6cc4f9ce01e66f"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
