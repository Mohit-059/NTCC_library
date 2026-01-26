import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCUcFlTG5cm_44eiMzwToTlSR6oKbV5Gj4",
    authDomain: "papero-library.firebaseapp.com",
    projectId: "papero-library",
    storageBucket: "papero-library.firebasestorage.app",
    messagingSenderId: "827205635303",
    appId: "1:827205635303:web:3ffe220ff2fd10b1de2642",
    measurementId: "G-H6JN29784L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
