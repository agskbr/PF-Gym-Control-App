import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAXjAvlncE6ESilGoJxdljX8-EJa_oJ8A",
  authDomain: "pf-gym-control.firebaseapp.com",
  projectId: "pf-gym-control",
  storageBucket: "pf-gym-control.appspot.com",
  messagingSenderId: "761963586092",
  appId: "1:761963586092:web:14f7419b7c6facb71a2789",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();

export {
  firebaseApp,
  googleAuthProvider,
  auth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
};
