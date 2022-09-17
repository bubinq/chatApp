import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyADYRocrSQVTh0GhWHsnPq90wIV9_y-BLE",
    authDomain: "chatapp-6a430.firebaseapp.com",
    projectId: "chatapp-6a430",
    storageBucket: "chatapp-6a430.appspot.com",
    messagingSenderId: "559649384772",
    appId: "1:559649384772:web:8501fe848c47a5d0b84f11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)