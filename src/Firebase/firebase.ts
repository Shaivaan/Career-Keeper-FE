import firebase from 'firebase/compat/app';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import "firebase/firestore";
const {VITE_API_KEY,VITE_AUTH_DOMAIN,VITE_PROJECT_ID,VITE_STORAGE_BUCKET,VITE_MESSAGING_SENDER_ID,VITE_APP_ID} = import.meta.env

const firebaseConfig = {
    apiKey: VITE_API_KEY,
    authDomain: VITE_AUTH_DOMAIN,
    projectId: VITE_PROJECT_ID,
    storageBucket:VITE_STORAGE_BUCKET,
    messagingSenderId: VITE_MESSAGING_SENDER_ID,
    appId:VITE_APP_ID
  };

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
export type FireTime =  firebase.firestore.Timestamp
export {firebaseApp, firebaseAuth, firebaseFirestore,firebaseStorage} ;