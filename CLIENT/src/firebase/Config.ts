// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyByy2NwoHABubS-412K7CxqdqAiYgXOgVA",
  authDomain: "mekatones-78a43.firebaseapp.com",
  projectId: "mekatones-78a43",
  storageBucket: "mekatones-78a43.firebasestorage.app",
  messagingSenderId: "530066014093",
  appId: "1:530066014093:web:88c57ea02281bddf38c7c4",
  measurementId: "G-JP008MWEQF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
