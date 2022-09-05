import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2tg3o7WL3TWHC6CAG2t1pxgQyEmVgapA",
  authDomain: "fern-446ae.firebaseapp.com",
  projectId: "fern-446ae",
  storageBucket: "fern-446ae.appspot.com",
  messagingSenderId: "842630607601",
  appId: "1:842630607601:web:5bb28413839b6efd536f50",
  measurementId: "G-D0VPDXJFYG",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();

export default firebaseConfig;
