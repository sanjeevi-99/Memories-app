import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCH-Q0AVe3S6Cq_BACw0Pi9_LKEHrkfRfM",
  authDomain: "memories-4287e.firebaseapp.com",
  projectId: "memories-4287e",
  storageBucket: "memories-4287e.appspot.com",
  messagingSenderId: "823637396021",
  appId: "1:823637396021:web:89595e52aa65e9962ebf7c",
  measurementId: "G-YF6HRJWT3G"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);