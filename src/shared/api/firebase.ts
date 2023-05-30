// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE__API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE__AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE__projectId,
    storageBucket: import.meta.env.VITE_FIREBASE__STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE__MESS_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE__APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE__MEASU_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
