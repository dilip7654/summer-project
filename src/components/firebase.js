// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD9NYByHgaBu3L9HdK3r8uZa_M1JKOAk4",
  authDomain: "team-collab-cabc7.firebaseapp.com",
  projectId: "team-collab-cabc7",
  storageBucket: "team-collab-cabc7.firebasestorage.app",
  messagingSenderId: "471124372515",
  appId: "1:471124372515:web:a2d009b2cd855e872e9596",
  measurementId: "G-822LGEHHVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider,db };