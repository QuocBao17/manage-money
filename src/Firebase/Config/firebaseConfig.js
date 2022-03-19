import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyD2X-Zh-PisB0aKO3NuTi-PPxT2fTfHBiU",
  authDomain: "money-db-5305b.firebaseapp.com",
  projectId: "money-db-5305b",
  storageBucket: "money-db-5305b.appspot.com",
  messagingSenderId: "413204780038",
  appId: "1:413204780038:web:dd41e6b6cb46391ecedf87",
  measurementId: "G-N899WBYK9J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore();
