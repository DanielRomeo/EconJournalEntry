// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyAj3EBI14Fg4ijrTbs9QTT-fuQeIySOhVQ",
	authDomain: "econjournalentry.firebaseapp.com",
	projectId: "econjournalentry",
	storageBucket: "econjournalentry.appspot.com",
	messagingSenderId: "98449846111",
	appId: "1:98449846111:web:56b828a677dc012c4510ea",
	measurementId: "G-953MDCJYQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const imageDb = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db , imageDb};
