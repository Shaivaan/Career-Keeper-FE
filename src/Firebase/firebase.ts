import {initializeApp} from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1jta9Y0C4Jkg3A6-Fp8x-JycACtv1KZA",
    authDomain: "portfolio-a69a4.firebaseapp.com",
    projectId: "portfolio-a69a4",
    storageBucket: "portfolio-a69a4.appspot.com",
    messagingSenderId: "575567062146",
    appId: "1:575567062146:web:a32f33a3b9e5456c9ec09b"
  };

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;