import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { exp } from "firebase/firestore/pipelines";

const firebaseConfig = {
  apiKey: "AIzaSyANJUFx_N8oGgce0CbeXftyY2AUOjhJcwU",
  authDomain: "sip-vibe.firebaseapp.com",
  projectId: "sip-vibe",
  storageBucket: "sip-vibe.firebasestorage.app",
  messagingSenderId: "1050900062612",
  appId: "1:1050900062612:web:96dd00825ff967b9272f81",
  measurementId: "G-SGKR6ZMQEZ"
};

//initialize firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)