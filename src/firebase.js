import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyACpJGvN2HSVl219oyDLI8yJ5kzJXiTYP8",
  authDomain: "ezwa-app-10efc.firebaseapp.com",
  databaseURL: "https://ezwa-app-10efc-default-rtdb.firebaseio.com",
  projectId: "ezwa-app-10efc",
  storageBucket: "ezwa-app-10efc.firebasestorage.app",
  messagingSenderId: "318035105879",
  appId: "1:318035105879:web:b9df1749526b5530422b12"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);