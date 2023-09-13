// import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEFQc77Gxa7yzfPdTEzd3BNeH8Jhhi-OI",
    authDomain: "dc-mvp.firebaseapp.com",
    projectId: "dc-mvp",
    storageBucket: "dc-mvp.appspot.com",
    messagingSenderId: "316129031315",
    appId: "1:316129031315:web:6e9cdb7c897ac746bec966"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// export { db }
// // Export Firebase services for use throughout your app
// export { firebase, db, auth };
export const auth = getAuth(app);
export default app;