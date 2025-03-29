// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAOF-n5l3aCb_KNR92FutwkQ2M0O0zdKbo",
    authDomain: "ebooking-698ef.firebaseapp.com",
    projectId: "ebooking-698ef",
    storageBucket: "ebooking-698ef.firebasestorage.app",
    messagingSenderId: "966611139572",
    appId: "1:966611139572:web:663a61142f0789d48d97a1",
    measurementId: "G-ZEN8HFENYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };