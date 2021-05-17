import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgVZ4nedd2OrhO1FUx8wUXca2aH1LU1aI",
  authDomain: "feed-53dda.firebaseapp.com",
  projectId: "feed-53dda",
  storageBucket: "feed-53dda.appspot.com",
  messagingSenderId: "734174126219",
  appId: "1:734174126219:web:d4722d8334ecd88be5748e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();

// Storage exports
export const storage = firebase.storage();
