import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//config

const firebaseConfig = {
  apiKey: "AIzaSyBkM9mCCdbT9tj8dj1a81ivsoV_n_zqU6Q",
  authDomain: "indie-tester.firebaseapp.com",
  projectId: "indie-tester",
  storageBucket: "indie-tester.firebasestorage.app",
  messagingSenderId: "952918757329",
  appId: "1:952918757329:web:6789c25349e0bfdb2f1af0",
  measurementId: "G-WM5MTPYNBK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Standart login işlemleri için auth örneği

export const googleProvider = new GoogleAuthProvider(); // Google ile giriş için

export const db = getFirestore(app); // Database'e ulaşım (kaydedilen oyunlar vs. için)
