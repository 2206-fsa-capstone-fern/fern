import { auth, db } from "../config/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, deleteUser } from "firebase/auth";


//action type
const GET_USER = "GET_USER";

//action creator
const getUser = (user) => ({ type: GET_USER, user });

//thunk
export const gettingUser = () => async (dispatch) => {
  try {
    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
    let loggedUser
    if(!userId) {
        onAuthStateChanged(auth, async (u) => {
          if(u) {
            loggedUser = await getDoc(doc(db, "users", u.uid)).then((doc) => {
              return (doc.data());
            });
            return dispatch(getUser(loggedUser))
          } else {
            return dispatch(getUser({}))
          }
        })
    } else {
      const user = await getDoc(doc(db, "users", userId)).then((doc) => {
        return (doc.data());
      });
    
      return dispatch(getUser(user));
    }
  } catch (err) {
    return dispatch(getUser(err))
  }
};

export const loggingOut = (navigate) => async () => {
  await signOut(auth)
  navigate("/")
};

export const loggingIn = (email, password) => async (dispatch) => {
  try{
    await signInWithEmailAndPassword(auth, email, password)
    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
    const user = await getDoc(doc(db, "users", userId)).then((doc) => {
      return (doc.data());
    });
    return dispatch(getUser(user));
  } catch (err) {
    return dispatch(getUser(err))
  }
};

export const signup = (email, password, firstName, lastName, phoneNumber) => async (dispatch) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created:", cred.user);
      return setDoc(doc(db, "users", cred.user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
      })
    })

    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
    const user = await getDoc(doc(db, "users", userId)).then((doc) => {
      return (doc.data());
    });
    return dispatch(getUser(user));
  } catch (err) {
    return dispatch(getUser(err))
  }
};

export const deletingAccount = (navigate) => async () => {
  try {
    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
    await deleteDoc(doc(db, "users", userId))
    await deleteDoc(doc(db, "users", userId, "transactions", userId))
    await deleteUser(auth.currentUser)
    navigate("/signup")
  } catch (err) {
    console.log(err)
  }
};

//reducer
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
};

export default authReducer;