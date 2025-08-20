// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDINJ2wZ0jYciZ8CW-6K4gPp8DH-0qYC2Q",
  authDomain: "run-x-37835.firebaseapp.com",
  projectId: "run-x-37835",
  storageBucket: "run-x-37835.firebasestorage.app",
  messagingSenderId: "190748129553",
  appId: "1:190748129553:web:b9cdd842e54386198934b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  // persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const usersRef = collection(db, "users");
