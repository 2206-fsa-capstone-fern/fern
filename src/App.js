// import { db, auth, accountsRef } from "./firebase";
// import {
//   onSnapshot,
//   addDoc,
//   deleteDoc,
//   doc,
//   serverTimestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// //changes for every collection change //real time collection data
// onSnapshot(accountsRef, (snapshot) => {
//   let accounts = [];
//   snapshot.docs.forEach((doc) => {
//     accounts.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(accounts);
// });

// const signup = (event) => {
//   const signupForm = document.querySelector(".signup");
//   event.preventDefault();

//   const email = signupForm.email.value;
//   const password = signupForm.password.value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((cred) => {
//       console.log("user created:", cred.user);
//       signupForm.reset();
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// const login = (event) => {
//   const loginForm = document.querySelector(".login");
//   event.preventDefault();

//   const email = loginForm.email.value;
//   const password = loginForm.password.value;

//   signInWithEmailAndPassword(auth, email, password).then((cred) => {
//     console.log('user logged in:', cred.user)
//   }).catch((err) => {
//     console.log(err.message)
//   })
// };

// const logout = (event) => {
//   event.preventDefault();

//   signOut(auth).then(() => {
//     console.log('the user signed out')
//   }).catch((err) => {
//     console.log(err.message)
//   })
// };

// const addAccount = (event) => {
//   const addAccountForm = document.querySelector(".add");
//   event.preventDefault();

//   addDoc(accountsRef, {
//     number: addAccountForm.number.value,
//     firstName: addAccountForm.firstName.value,
//     lastName: addAccountForm.lastName.value,
//     createdAt: serverTimestamp(),
//   }).then(() => {
//     addAccountForm.reset();
//   });
// };

// const deleteAccount = (event) => {
//   const deleteAccountForm = document.querySelector(".delete");
//   event.preventDefault();

//   const docRef = doc(db, "accounts", deleteAccountForm.id.value);

//   deleteDoc(docRef).then(() => {
//     deleteAccountForm.reset();
//   });
// };

// const updateAccount = (event) => {
//   const updateForm = document.querySelector(".update");
//   event.preventDefault();

//   const docRef = doc(db, "accounts", updateForm.id.value);

//   updateDoc(docRef, {
//     number: 1245,
//   }).then(() => {
//     updateForm.reset();
//   });
// };

// //subscribing to auth chnages
// onAuthStateChanged(auth, (user) => {
//   console.log('user status changed:', user)
// })

// function App() {
//   return (
//     <div className="App">
//       <h2>Firebase Auth</h2>

//       <form className="signup">
//         <label htmlFor="email">email:</label>
//         <input type="email" name="email" required />
//         <label htmlFor="password">password:</label>
//         <input type="password" name="password" required />
//         <button onClick={(event) => signup(event)}>signup</button>
//       </form>

//       <form className="login">
// <label htmlFor="email">email:</label>
// <input type="email" name="email" required />
// <label htmlFor="password">password:</label>
// <input type="password" name="password" required />
// <button onClick={(event) => login(event)}>login</button>
//       </form>

//       <button className="logout" onClick={(event) => logout(event)}>logout</button>

//       <h2>Firebase FireStore</h2>

//       <form className="add">
//         <label htmlFor="number">number:</label>
//         <input type="number" name="number" required />
//         <label htmlFor="firstName">First Name:</label>
//         <input type="text" name="firstName" required />
//         <label htmlFor="lastName">Last Name:</label>
//         <input type="text" name="lastName" required />

//         <button onClick={(event) => addAccount(event)}>add new account</button>
//       </form>

//       <form className="delete">
//         <label htmlFor="id">Document id:</label>
//         <input type="text" name="id" required />

//         <button onClick={(event) => deleteAccount(event)}>
//           delete account
//         </button>
//       </form>

//       <form className="update">
//         <label htmlFor="id">Document id:</label>
//         <input type="text" name="id" required />

//         <button onClick={(event) => updateAccount(event)}>
//           update account
//         </button>
//       </form>
//     </div>
//   );
// }

// export default App;

import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/layout/Navbar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
