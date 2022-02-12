import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB2Ksu_mphl7GoWF9zCwGVkSaVCrTTknCk",
    authDomain: "login-form-app-18c1e.firebaseapp.com",
    databaseURL: "https://login-form-app-18c1e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "login-form-app-18c1e",
    storageBucket: "login-form-app-18c1e.appspot.com",
    messagingSenderId: "828076952376",
    appId: "1:828076952376:web:6ee1d47435b3c15fdc8fcd",
  });

export const auth = firebase.auth();
export const database = firebase.database();

