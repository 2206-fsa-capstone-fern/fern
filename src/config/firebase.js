import { initializeApp } from "firebase/app";
import {
  getFirestore,
} from "firebase/firestore";
import {
  getAuth,
} from 'firebase/auth'

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

//-----------------------------------------------------------------------------------------------
// import {
//   getFirestore,
//   collection,
//   onSnapshot,
//   // getDocs,
//   // getDoc,
//   addDoc,
//   deleteDoc,
//   doc,
//   // query,
//   // where,
//   // orderBy,
//   serverTimestamp,
//   updateDoc,
//-----------------------------------------------------------------------------------------------
// } from "firebase/firestore";
//-----------------------------------------------------------------------------------------------
//init services
// const db = getFirestore();
// const auth = getAuth()
//-----------------------------------------------------------------------------------------------
//collection ref
// const colRef = collection(db, "accounts"
//-----------------------------------------------------------------------------------------------
//queries
//const q = query(colRef, where('firstName', '==', 'Victor'), orderBy('number', 'desc'))
// const q = query(colRef, orderBy('createdAt'))

//get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let accounts = [];
//     snapshot.docs.forEach((doc) => {
//       accounts.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(accounts);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//collection where q
// onSnapshot(q, (snapshot) => {
//   let accounts = [];
//   snapshot.docs.forEach((doc) => {
//     accounts.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(accounts);
// })
//------------------------------------------------------------------------------------------------
//get a single document
// const docRef = doc(db, 'accounts', 'z8sDuMDIa3B1gUZiJI1o')

// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id)
// })

// onSnapshot(docRef, (doc) => {
//   console.log(doc.data(), doc.id)
// })
//------------------------------------------------------------------------------------------------