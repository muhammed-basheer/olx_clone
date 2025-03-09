// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (replace with your own keys from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyA4dlchXeq86J7GH9-3zOyVbxu2yf3Zc6o",
  authDomain: "olx-clone-5c11c.firebaseapp.com",
  projectId: "olx-clone-5c11c",
  storageBucket: "olx-clone-5c11c.appspot.com",
  messagingSenderId: "6295074388",  
  appId: "1:6295074388:web:38cfd257a4aded9c16dfc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Authentication instance
const db = getFirestore(app); // Firestore instance

export { auth, app, db }; // Export auth, app, and db
